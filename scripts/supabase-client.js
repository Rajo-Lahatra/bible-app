// Configuration Supabase
const SUPABASE_URL = 'https://kezxiohmrslvsdlkkcor.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtlenhpb2htcnNsdnNkbGtrY29yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEwNjUxODUsImV4cCI6MjA3NjY0MTE4NX0.QaR6V4cjQdUsJjuCcXC3S4tSckk-ChyscCBf2cxYu4E';

export async function initSupabase() {
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