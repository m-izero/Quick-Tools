import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Clock, User, Calendar, Share2, Facebook, Twitter, Linkedin } from 'lucide-react';
import { blogPosts } from './Blog';

const postContent: Record<string, React.ReactNode> = {
  'compress-images-quality': (
    <div className="prose prose-zinc dark:prose-invert max-w-none">
      <p>Image compression is a critical aspect of web performance. Large image files can significantly slow down page load times, leading to a poor user experience and lower search engine rankings. However, the challenge lies in reducing file size without compromising visual quality. This guide explores the techniques and tools you can use to achieve the perfect balance.</p>
      
      <h2>Understanding Lossy vs. Lossless Compression</h2>
      <p>There are two primary types of image compression: lossy and lossless. Lossy compression reduces file size by permanently removing some data from the image. This can result in a noticeable loss of quality if the compression is too aggressive. Lossless compression, on the other hand, reduces file size without any loss of quality by reorganizing the image data more efficiently.</p>
      
      <h3>When to Use Lossy Compression</h3>
      <p>Lossy compression is ideal for photographs and complex images where a slight loss of detail is not easily noticeable. Formats like JPEG and WebP are commonly used for lossy compression. By adjusting the quality setting, you can often achieve significant file size reductions with minimal impact on visual fidelity.</p>
      
      <h3>When to Use Lossless Compression</h3>
      <p>Lossless compression is best for images with sharp lines, text, or solid colors, such as logos, icons, and screenshots. Formats like PNG and GIF are typically used for lossless compression. While the file size reduction may not be as dramatic as with lossy compression, the image quality remains identical to the original.</p>
      
      <h2>Best Practices for Image Compression</h2>
      <ul>
        <li><strong>Choose the Right Format:</strong> Use JPEG for photos, PNG for graphics with transparency, and WebP for a modern, efficient alternative that supports both lossy and lossless compression.</li>
        <li><strong>Resize Before Compressing:</strong> Don't upload a 4000px wide image if it will only be displayed at 800px. Resize the image to its intended display dimensions first.</li>
        <li><strong>Use Online Tools:</strong> Tools like our Image Compressor use advanced algorithms to optimize your images directly in the browser, ensuring privacy and speed.</li>
        <li><strong>Test and Iterate:</strong> Experiment with different compression levels and formats to find the best results for your specific needs.</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>Effective image compression is an essential skill for any web developer or content creator. By understanding the different types of compression and following best practices, you can create a faster, more engaging web experience for your users without sacrificing the visual quality of your images.</p>
    </div>
  ),
  'base64-encoding-explained': (
    <div className="prose prose-zinc dark:prose-invert max-w-none">
      <p>Base64 encoding is a common technique used to represent binary data in an ASCII string format. It's widely used in web development for embedding images in CSS or HTML, sending data over email, and more. But what exactly is it, and how does it work? Let's break it down simply.</p>
      
      <h2>What is Base64?</h2>
      <p>At its core, Base64 is a way to translate binary data (like an image or a file) into a set of 64 characters. These characters include uppercase letters (A-Z), lowercase letters (a-z), numbers (0-9), and two additional symbols (+ and /). The equals sign (=) is often used as padding at the end of the string.</p>
      
      <h2>How Does it Work?</h2>
      <p>The encoding process works by taking groups of three bytes (24 bits) of binary data and splitting them into four groups of six bits each. Each six-bit group represents a value from 0 to 63, which corresponds to one of the 64 characters in the Base64 alphabet. This results in a text string that is roughly 33% larger than the original binary data.</p>
      
      <h2>Why Use Base64?</h2>
      <p>Base64 is useful because it allows binary data to be transmitted over systems that are designed to handle only text. For example, some older email systems or data formats may not support binary data directly. By encoding the data as Base64, you can ensure it remains intact during transmission.</p>
      
      <h3>Common Use Cases</h3>
      <ul>
        <li><strong>Data URIs:</strong> Embedding small images or fonts directly into HTML or CSS files to reduce the number of HTTP requests.</li>
        <li><strong>Email Attachments:</strong> Encoding files so they can be sent as part of a text-based email message.</li>
        <li><strong>API Requests:</strong> Sending binary data (like a profile picture) as part of a JSON or XML request.</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>While Base64 encoding increases the size of your data, its ability to represent binary data as text makes it an invaluable tool in the web developer's toolkit. Understanding how it works and when to use it can help you build more robust and efficient applications.</p>
    </div>
  ),
  'generate-strong-passwords': (
    <div className="prose prose-zinc dark:prose-invert max-w-none">
      <p>In today's digital world, your password is the first line of defense against cyber threats. A weak password can be easily guessed or cracked by hackers, giving them access to your personal information, financial accounts, and more. This guide will show you how to generate strong, secure passwords that are virtually impossible to crack.</p>
      
      <h2>What Makes a Password Strong?</h2>
      <p>A strong password is one that is long, complex, and unique. Here are the key characteristics of a secure password:</p>
      <ul>
        <li><strong>Length:</strong> Aim for at least 12-16 characters. The longer the password, the harder it is to crack.</li>
        <li><strong>Complexity:</strong> Use a mix of uppercase and lowercase letters, numbers, and special symbols (e.g., !, @, #, $).</li>
        <li><strong>Uniqueness:</strong> Never reuse the same password for multiple accounts. If one account is compromised, all your other accounts will be at risk.</li>
        <li><strong>Randomness:</strong> Avoid using easily guessable information like your name, birthdate, or common words. A truly random string of characters is the most secure.</li>
      </ul>
      
      <h2>How to Generate Strong Passwords</h2>
      <p>Creating a strong, random password manually can be difficult. Fortunately, there are tools and techniques you can use to make the process easier:</p>
      
      <h3>Use a Password Generator</h3>
      <p>Our Random String Generator uses cryptographically secure algorithms to create truly random passwords in your browser. You can customize the length and character types to meet the requirements of any site.</p>
      
      <h3>Use Passphrases</h3>
      <p>A passphrase is a series of random words that are easy for you to remember but hard for a computer to guess. For example, "Correct-Horse-Battery-Staple" is a famous example of a strong passphrase.</p>
      
      <h3>Use a Password Manager</h3>
      <p>A password manager is a secure application that stores and manages all your passwords for you. It can also generate strong passwords and automatically fill them in when you visit a site. This allows you to have a unique, complex password for every account without having to remember them all.</p>
      
      <h2>Conclusion</h2>
      <p>Generating strong passwords is one of the most important things you can do to protect your online security. By following these tips and using the right tools, you can keep your accounts safe and your personal information secure.</p>
    </div>
  ),
  'best-free-tools-developers': (
    <div className="prose prose-zinc dark:prose-invert max-w-none">
      <p>As a developer, your productivity is often tied to the tools you use. While there are many powerful (and expensive) software sites available, there are also many incredible free online tools that can help you streamline your workflow and build better applications. Here are some of the best free online tools for developers.</p>
      
      <h2>1. QuickTools Pro</h2>
      <p>Of course, we have to mention our own site of tools! QuickTools Pro offers a wide range of utilities for developers, including image compression, PDF manipulation, security tools, and more. All tools run locally in your browser, ensuring your data remains private and secure.</p>
      
      <h2>2. JSON Formatter & Validator</h2>
      <p>Working with JSON data is a daily task for many developers. A good JSON formatter can help you visualize and debug complex data structures, while a validator can ensure your JSON is syntactically correct.</p>
      
      <h2>3. Base64 Encoder/Decoder</h2>
      <p>Whether you're embedding images in CSS or sending data over an API, a Base64 tool is essential for quickly encoding and decoding binary data.</p>
      
      <h2>4. QR Code Generator</h2>
      <p>QR codes are a versatile way to share URLs, text, and other information. A free QR code generator can help you create custom codes for your projects and marketing materials.</p>
      
      <h2>5. Color Pickers & Converters</h2>
      <p>Finding the perfect color for your design and converting it between different formats (HEX, RGB, HSL) is a common task. Online color tools make this process fast and easy.</p>
      
      <h2>Conclusion</h2>
      <p>The web is full of amazing free resources for developers. By incorporating these tools into your daily workflow, you can save time, reduce errors, and focus on what you do best: building great software.</p>
    </div>
  ),
  'how-to-use-qr-generator': (
    <div className="prose prose-zinc dark:prose-invert max-w-none">
      <p>QR codes (Quick Response codes) have become a ubiquitous part of our daily lives, from restaurant menus to marketing posters. They offer a fast and convenient way to share information with anyone who has a smartphone. This guide will show you how to use a QR code generator to create your own custom codes.</p>
      
      <h2>What is a QR Code?</h2>
      <p>A QR code is a type of two-dimensional barcode that can store a variety of information, such as a URL, text, contact information, or even Wi-Fi credentials. When scanned with a smartphone camera, the code is instantly decoded, and the information is displayed or the action is performed.</p>
      
      <h2>How to Generate a QR Code</h2>
      <p>Generating a QR code is a simple process that can be done in a few easy steps using our QR Code Tool:</p>
      <ol>
        <li><strong>Select the Type of Information:</strong> Choose whether you want to encode a URL, plain text, or other data.</li>
        <li><strong>Enter the Data:</strong> Type or paste the information you want to encode into the input field.</li>
        <li><strong>Customize (Optional):</strong> Some generators allow you to customize the color, size, and error correction level of your QR code.</li>
        <li><strong>Generate and Download:</strong> Click the generate button to create your code, then download it as an image file (e.g., PNG or SVG).</li>
      </ol>
      
      <h2>Best Practices for QR Codes</h2>
      <ul>
        <li><strong>Test Your Code:</strong> Always scan your QR code with multiple devices and apps to ensure it works correctly before printing or sharing it.</li>
        <li><strong>Keep it Simple:</strong> Avoid encoding too much information in a single code, as this can make it harder to scan.</li>
        <li><strong>Provide a Clear Call to Action:</strong> Tell your users what will happen when they scan the code (e.g., "Scan to view our menu").</li>
        <li><strong>Use High Contrast:</strong> Ensure there is a clear contrast between the QR code and its background for optimal scanning.</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>QR codes are a powerful and versatile tool for sharing information in the physical and digital worlds. By following these simple steps and best practices, you can create effective QR codes for any project or purpose.</p>
    </div>
  )
};

export function BlogPost() {
  const { id } = useParams();
  const post = blogPosts.find(p => p.id === id);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <Link 
        to="/blog"
        className="inline-flex items-center gap-2 text-sm font-black text-zinc-500 hover:text-emerald-500 transition-colors mb-12 uppercase tracking-widest"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Blog
      </Link>

      <article>
        <header className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <span className="px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest border border-emerald-100 dark:border-emerald-500/20">
              {post.category}
            </span>
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
              <Clock className="h-3 w-3" />
              {post.readTime}
            </div>
          </div>
          
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-zinc-900 dark:text-white mb-8 leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 pt-8 border-t border-zinc-100 dark:border-zinc-800">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                <User className="h-5 w-5 text-zinc-400" />
              </div>
              <div>
                <p className="text-xs font-black text-zinc-900 dark:text-white uppercase tracking-widest">{post.author}</p>
                <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Author</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                <Calendar className="h-5 w-5 text-zinc-400" />
              </div>
              <div>
                <p className="text-xs font-black text-zinc-900 dark:text-white uppercase tracking-widest">{post.date}</p>
                <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Published</p>
              </div>
            </div>
          </div>
        </header>

        <div className="relative">
          <div className="absolute -left-20 top-0 hidden xl:flex flex-col gap-4">
            <button className="h-10 w-10 rounded-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-emerald-500 transition-colors">
              <Facebook className="h-4 w-4" />
            </button>
            <button className="h-10 w-10 rounded-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-emerald-500 transition-colors">
              <Twitter className="h-4 w-4" />
            </button>
            <button className="h-10 w-10 rounded-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-emerald-500 transition-colors">
              <Linkedin className="h-4 w-4" />
            </button>
            <button className="h-10 w-10 rounded-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-emerald-500 transition-colors">
              <Share2 className="h-4 w-4" />
            </button>
          </div>
          
          <div className="bg-white dark:bg-zinc-900 rounded-[3rem] p-8 sm:p-12 border border-zinc-100 dark:border-zinc-800 shadow-2xl shadow-emerald-500/5">
            {postContent[post.id]}
          </div>
        </div>
      </article>

      <div className="mt-20 p-12 rounded-[3rem] bg-zinc-900 text-center text-white relative overflow-hidden">
        <h2 className="text-3xl font-black mb-4 relative z-10">Was this helpful?</h2>
        <p className="text-zinc-400 mb-8 max-w-xl mx-auto font-medium relative z-10">
          Check out our full site of free online tools to help you with your daily developer tasks.
        </p>
        <Link 
          to="/" 
          className="inline-flex items-center justify-center px-10 py-4 rounded-2xl bg-emerald-500 text-white font-black text-sm uppercase tracking-widest hover:scale-105 transition-all relative z-10"
        >
          Explore Tools
        </Link>
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500 rounded-full blur-[120px]" />
        </div>
      </div>
    </div>
  );
}
