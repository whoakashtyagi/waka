const express = require('express');
const path = require('path');
const ejs = require('ejs');
require('dotenv').config();

const { createClient } = require('@supabase/supabase-js');

// Validate Supabase environment variables
if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
    console.error('Error: Missing Supabase configuration in environment variables.');
    process.exit(1);
}

// Create a single Supabase client instance
const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
);

const app = express();
const PORT = process.env.PORT || 3000;

// Add body parser middleware for JSON
app.use(express.json());

// Set EJS as the templating engine
app.engine('html', ejs.renderFile);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, '../'));

// Serve the HTML file with environment variables injected
app.get('/', (_req, res) => {
    res.render('index.html');
});

// Serve static files (e.g., CSS, JS, images)
app.use(express.static(path.join(__dirname)));

// Fetch "wakacanada" content from Supabase
app.get('/api/content', async (req, res) => {
    try {
        const { data: prapper_cms, error } = await supabase
            .from('prapper_cms')
            .select('content_data, updated_at')
            .eq('id', 'wakacanada')
            .limit(1);

        if (error) {
            console.error('Supabase fetch error:', error);
            return res.status(500).json({ error: error.message });
        }

        if (prapper_cms && prapper_cms.length > 0) {
            return res.json({
                content: prapper_cms[0].content_data || null,
                updated_at: prapper_cms[0].updated_at || null
            });
        } else {
            return res.json({ content: null, updated_at: null });
        }
    } catch (err) {
        console.error('Unexpected error:', err);
        res.status(500).json({ error: 'An unexpected error occurred.' });
    }
});

// Update "wakacanada" content in Supabase
app.post('/api/content', async (req, res) => {
    try {
        const newContent = req.body.content;
        
        if (newContent === undefined) {
            return res.status(400).json({ error: 'Content is required' });
        }
        
        const { data, error } = await supabase
            .from('prapper_cms')
            .update({ content_data: newContent, updated_at: new Date() })
            .eq('id', 'wakacanada');

        if (error) {
            console.error('Supabase update error:', error);
            return res.status(500).json({ error: error.message });
        }
        
        res.json({ success: true });
    } catch (err) {
        console.error('Unexpected error:', err);
        res.status(500).json({ error: 'An unexpected error occurred.' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});