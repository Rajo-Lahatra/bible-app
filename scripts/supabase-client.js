// Configuration Supabase
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

export async function initSupabase() {
    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
        console.warn('Variables Supabase non configurées');
        return null;
    }

    const { createClient } = supabase;
    return createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}

export async function saveHighlight(supabase, verseId, isHighlighted) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    if (isHighlighted) {
        await supabase
            .from('highlights')
            .upsert({
                user_id: user.id,
                verse_id: verseId,
                created_at: new Date().toISOString()
            });
    } else {
        await supabase
            .from('highlights')
            .delete()
            .eq('user_id', user.id)
            .eq('verse_id', verseId);
    }
}

export async function saveComment(supabase, verseId, content, linkedVerse = null) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    await supabase
        .from('comments')
        .insert({
            user_id: user.id,
            verse_id: verseId,
            content: content,
            linked_verse: linkedVerse,
            created_at: new Date().toISOString()
        });
}

export async function getUserData(supabase) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { highlights: [], comments: [] };

    const [highlightsRes, commentsRes] = await Promise.all([
        supabase.from('highlights').select('*').eq('user_id', user.id),
        supabase.from('comments').select('*').eq('user_id', user.id)
    ]);

    return {
        highlights: highlightsRes.data || [],
        comments: commentsRes.data || []
    };
}