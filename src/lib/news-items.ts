
export interface NewsItem {
    slug: string;
    title: string;
    date: string;
    author: string;
    description: string;
    content: string;
    likes: number;
    comments: {
        id: number;
        author: string;
        avatar: string;
        text: string;
        date: string;
    }[];
}

export const newsItems: NewsItem[] = [
    {
        slug: "genoui-launches-revolutionizing-ui-development",
        title: "GenoUI Launches: Revolutionizing UI Development with AI",
        date: "2023-10-26T10:00:00Z",
        author: "GenoUI Team",
        description: "We're thrilled to announce the official launch of GenoUI! Generate production-ready components from text prompts and accelerate your design workflow.",
        content: `
<p>The day is finally here! After months of development, we are incredibly excited to officially launch GenoUI to the public. Our mission is to empower developers and designers to build beautiful, high-quality user interfaces faster than ever before by leveraging the power of generative AI.</p>
<p>GenoUI understands natural language prompts and intelligently generates clean, responsive, and production-ready code for Tailwind CSS and HTML. Whether you need a simple button or a complex dashboard layout, GenoUI can create it in seconds, saving you countless hours of manual coding.</p>
<h3 class="font-semibold text-lg mt-4 mb-2">Key Features at Launch:</h3>
<ul class="list-disc list-inside space-y-2">
    <li><strong>Text-to-Component Generation:</strong> Describe the UI you want, and watch it come to life.</li>
    <li><strong>Tailwind CSS & HTML Support:</strong> Get clean, semantic, and developer-friendly code.</li>
    <li><strong>AI-Powered Enhancements:</strong> Automatically enhance your prompts for better design, add animations, and optimize layouts.</li>
    <li><strong>Community Gallery:</strong> Share your creations and get inspired by what others are building.</li>
</ul>
<p>We believe GenoUI will fundamentally change the way UIs are designed and built. This is just the beginning, and we can't wait to see what you create.</p>
`,
        likes: 125,
        comments: [
            { id: 1, author: 'Alex Smith', avatar: 'https://picsum.photos/40/40', text: 'This is a game-changer! Congrats on the launch!', date: '2023-10-26T11:30:00Z' },
            { id: 2, author: 'Jane Doe', avatar: 'https://picsum.photos/40/40', text: 'Just tried it out and I am blown away. The generated code is so clean.', date: '2023-10-26T14:00:00Z' },
        ],
    },
    {
        slug: "new-feature-image-to-component-generation",
        title: "New Feature: Image-to-Component Generation Now Live",
        date: "2023-11-15T10:00:00Z",
        author: "GenoUI Team",
        description: "You can now upload an image of a UI and have our AI replicate it. This powerful new feature streamlines the process of building from existing designs.",
        content: `
<p>We're excited to roll out one of our most requested features: Image-to-Component generation! Now, you can bring your visual inspirations to life by simply uploading a screenshot or a design mockup.</p>
<p>Our advanced vision model analyzes the layout, colors, typography, and structure of the uploaded image and generates a high-fidelity, coded component that matches the design. This is perfect for:</p>
<ul class="list-disc list-inside space-y-2">
    <li>Recreating components from your favorite websites.</li>
    <li>Turning design mockups from tools like Figma or Sketch into real code instantly.</li>
    <li>Streamlining the collaboration between designers and developers.</li>
</ul>
<p>To get started, simply click the "Upload Image" button on the dashboard, select your image file, and let GenoUI do the rest. We're committed to making UI development as seamless as possible, and this feature is a major step in that direction.</p>
`,
        likes: 210,
        comments: [
            { id: 1, author: 'Mike Johnson', avatar: 'https://picsum.photos/40/40', text: 'Wow, this is incredible. The accuracy is amazing.', date: '2023-11-15T12:00:00Z' },
        ],
    },
    {
        slug: "community-gallery-is-open",
        title: "Community Gallery is Open: Share Your Creations",
        date: "2023-12-05T10:00:00Z",
        author: "GenoUI Team",
        description: "The community gallery is now live! Publish your favorite creations, explore what others have built, and get inspired by the growing collection of AI-generated UIs.",
        content: `
<p>Collaboration and inspiration are at the heart of the design community. Today, we're thrilled to launch the GenoUI Community Gallery, a place for you to share your amazing creations with the world.</p>
<p>Now, after generating a component you love, you can publish it directly to the gallery. Give it a name, a description, and a category, and it will be available for other users to view, like, and even copy the code from.</p>
<p>The Community Gallery is more than just a showcase; it's a living library of design patterns and ideas, all powered by AI and curated by you, the community. We can't wait to see the incredible components you'll share!</p>
`,
        likes: 98,
        comments: [],
    },
];

    