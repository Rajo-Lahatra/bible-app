// Configuration Supabase
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

let supabaseInstance = null;

export async function initSupabase() {
    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
        console.warn('Variables Supabase non configurées');
        return null;
    }

    if (supabaseInstance) {
        return supabaseInstance;
    }

    const { createClient } = await import('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm');
    supabaseInstance = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    
    // Vérifier l'état d'authentification au chargement
    const { data: { session } } = await supabaseInstance.auth.getSession();
    if (session) {
        console.log('Utilisateur connecté:', session.user.email);
    }
    
    return supabaseInstance;
}

// Fonctions d'authentification
export async function signUp(email, password) {
    const supabase = await initSupabase();
    if (!supabase) throw new Error('Supabase non initialisé');

    const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
            emailRedirectTo: window.location.origin
        }
    });

    if (error) throw error;
    return data;
}

export async function signIn(email, password) {
    const supabase = await initSupabase();
    if (!supabase) throw new Error('Supabase non initialisé');

    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
    });

    if (error) throw error;
    return data;
}

export async function signOut() {
    const supabase = await initSupabase();
    if (!supabase) throw new Error('Supabase non initialisé');

    const { error } = await supabase.auth.signOut();
    if (error) throw error;
}

export async function getCurrentUser() {
    const supabase = await initSupabase();
    if (!supabase) return null;

    const { data: { user } } = await supabase.auth.getUser();
    return user;
}

export async function getSession() {
    const supabase = await initSupabase();
    if (!supabase) return null;

    const { data: { session } } = await supabase.auth.getSession();
    return session;
}

// Fonctions pour les données utilisateur
export async function saveHighlight(supabase, verseId, color) {
    const user = await getCurrentUser();
    if (!user) throw new Error('Utilisateur non connecté');

    if (color) {
        const { data, error } = await supabase
            .from('highlights')
            .upsert({
                user_id: user.id,
                verse_id: verseId,
                color: color,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            }, {
                onConflict: 'user_id,verse_id'
            });
        
        if (error) throw error;
        return data;
    } else {
        const { error } = await supabase
            .from('highlights')
            .delete()
            .eq('user_id', user.id)
            .eq('verse_id', verseId);
        
        if (error) throw error;
    }
}

export async function saveComment(supabase, verseId, content, linkedVerses = '') {
    const user = await getCurrentUser();
    if (!user) throw new Error('Utilisateur non connecté');

    const { data, error } = await supabase
        .from('comments')
        .insert({
            user_id: user.id,
            verse_id: verseId,
            content: content,
            linked_verse: linkedVerses,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        });
    
    if (error) throw error;
    return data;
}

export async function updateComment(supabase, commentId, newContent) {
    const user = await getCurrentUser();
    if (!user) throw new Error('Utilisateur non connecté');

    const { data, error } = await supabase
        .from('comments')
        .update({ 
            content: newContent,
            updated_at: new Date().toISOString()
        })
        .eq('id', commentId)
        .eq('user_id', user.id); // S'assurer que l'utilisateur ne peut modifier que ses propres commentaires
    
    if (error) {
        console.error('Erreur détaillée Supabase:', error);
        throw error;
    }
    return data;
}

export async function deleteComment(supabase, commentId) {
    const user = await getCurrentUser();
    if (!user) throw new Error('Utilisateur non connecté');

    const { error } = await supabase
        .from('comments')
        .delete()
        .eq('id', commentId)
        .eq('user_id', user.id); // S'assurer que l'utilisateur ne peut supprimer que ses propres commentaires
    
    if (error) {
        console.error('Erreur détaillée Supabase:', error);
        throw error;
    }
}

export async function deleteHighlight(supabase, highlightId) {
    const user = await getCurrentUser();
    if (!user) throw new Error('Utilisateur non connecté');

    const { error } = await supabase
        .from('highlights')
        .delete()
        .eq('id', highlightId)
        .eq('user_id', user.id); // S'assurer que l'utilisateur ne peut supprimer que ses propres surlignages
    
    if (error) {
        console.error('Erreur détaillée Supabase:', error);
        throw error;
    }
}

export async function getUserData(supabase) {
    const user = await getCurrentUser();
    if (!user) return { highlights: [], comments: [] };

    const [highlightsRes, commentsRes] = await Promise.all([
        supabase.from('highlights').select('*').eq('user_id', user.id),
        supabase.from('comments').select('*').eq('user_id', user.id)
    ]);

    if (highlightsRes.error) throw highlightsRes.error;
    if (commentsRes.error) throw commentsRes.error;

    return {
        highlights: highlightsRes.data || [],
        comments: commentsRes.data || []
    };
}