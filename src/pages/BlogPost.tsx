import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'motion/react';
import { ArrowLeft, Clock, User, Calendar, Share2, Facebook, Twitter, Linkedin } from 'lucide-react';
import { blogPosts } from './Blog';

const postContent: Record<string, React.ReactNode> = {
  'compress-images-quality': (
    <div className="prose prose-zinc dark:prose-invert max-w-none">
      <p>Image compression is a critical aspect of web performance. Large image files can significantly slow down page load times, leading to a poor user experience and lower search engine rankings. However, the challenge lies in reducing file size without compromising visual quality. This guide explores the techniques and tools you can use to achieve the perfect balance. In the modern digital landscape, where attention spans are short and mobile browsing is dominant, every millisecond counts. A website that loads slowly due to unoptimized images is a website that loses visitors.</p>
      
      <h2>Understanding Lossy vs. Lossless Compression</h2>
      <p>There are two primary types of image compression: lossy and lossless. Lossy compression reduces file size by permanently removing some data from the image. This can result in a noticeable loss of quality if the compression is too aggressive. Lossless compression, on the other hand, reduces file size without any loss of quality by reorganizing the image data more efficiently. The choice between these two methods depends heavily on the type of image you are working with and the context in which it will be displayed.</p>
      
      <h3>When to Use Lossy Compression</h3>
      <p>Lossy compression is ideal for photographs and complex images where a slight loss of detail is not easily noticeable. Formats like JPEG and WebP are commonly used for lossy compression. By adjusting the quality setting, you can often achieve significant file size reductions with minimal impact on visual fidelity. For instance, a high-resolution photograph taken with a professional camera might be several megabytes in size. By applying lossy compression at a quality level of 70-80%, you can often reduce that size by 90% while the image still looks perfect to the naked eye on a standard screen.</p>
      
      <h3>When to Use Lossless Compression</h3>
      <p>Lossless compression is best for images with sharp lines, text, or solid colors, such as logos, icons, and screenshots. Formats like PNG and GIF are typically used for lossless compression. While the file size reduction may not be as dramatic as with lossy compression, the image quality remains identical to the original. This is crucial for branding elements where any blurriness or artifacting would look unprofessional. Modern formats like WebP also offer a lossless mode that is often more efficient than traditional PNGs.</p>
      
      <h2>The Impact of Image Formats</h2>
      <p>Choosing the right file format is half the battle in image optimization. JPEG has been the standard for decades for photographs, but it lacks support for transparency. PNG is the go-to for graphics requiring transparency, but it can result in very large files for complex images. This is where WebP comes in. Developed by Google, WebP provides superior lossy and lossless compression for images on the web. Using WebP, webmasters and developers can create smaller, richer images that make the web faster. Most modern browsers now support WebP, making it a highly recommended choice for any web project.</p>

      <h2>Advanced Optimization Techniques</h2>
      <p>Beyond simple compression, there are other ways to optimize images for the web. One of the most effective is <strong>Responsive Images</strong>. This involves serving different image sizes based on the user's device. There's no reason to send a 2000px wide image to a mobile phone with a 400px wide screen. By using the <code>srcset</code> attribute in HTML, you can tell the browser which image size is most appropriate for the current viewport.</p>
      <p>Another technique is <strong>Lazy Loading</strong>. This delays the loading of images that are not currently in the viewport. As the user scrolls down, the images are loaded just before they come into view. This significantly improves the initial page load time and saves bandwidth for users who don't scroll through the entire page.</p>
      
      <h2>Best Practices for Image Compression</h2>
      <ul>
        <li><strong>Choose the Right Format:</strong> Use JPEG for photos, PNG for graphics with transparency, and WebP for a modern, efficient alternative that supports both lossy and lossless compression.</li>
        <li><strong>Resize Before Compressing:</strong> Don't upload a 4000px wide image if it will only be displayed at 800px. Resize the image to its intended display dimensions first. This is one of the most common mistakes in web development.</li>
        <li><strong>Use Online Tools:</strong> Tools like our <Link to="/image-compressor" className="text-emerald-500 font-bold hover:underline">Image Compressor</Link> use advanced algorithms to optimize your images directly in the browser, ensuring privacy and speed. Our tool allows you to preview the results before downloading, so you can find the perfect balance.</li>
        <li><strong>Automate the Process:</strong> If you manage a large website, consider using build tools or CMS plugins that automatically compress and resize images upon upload.</li>
        <li><strong>Test and Iterate:</strong> Experiment with different compression levels and formats to find the best results for your specific needs. Use tools like Google PageSpeed Insights to see how your images are affecting your performance.</li>
      </ul>
      
      <h2>The Future of Image Compression</h2>
      <p>As web technology continues to evolve, new image formats like AVIF are emerging. AVIF offers even better compression than WebP, though browser support is still growing. Staying informed about these developments is key to maintaining a high-performance website. The goal is always the same: providing the best possible visual experience with the smallest possible footprint.</p>

      <h2>Conclusion</h2>
      <p>Effective image compression is an essential skill for any web developer or content creator. By understanding the different types of compression, choosing the right formats, and following best practices, you can create a faster, more engaging web experience for your users without sacrificing the visual quality of your images. Remember, a faster website isn't just better for users; it's better for business, SEO, and the overall health of the internet.</p>
    </div>
  ),
  'base64-encoding-explained': (
    <div className="prose prose-zinc dark:prose-invert max-w-none">
      <p>Base64 encoding is a common technique used to represent binary data in an ASCII string format. It's widely used in web development for embedding images in CSS or HTML, sending data over email, and more. But what exactly is it, and how does it work? Let's break it down simply. In the world of computing, data is stored in many different formats, but not all systems are capable of handling all types of data. Base64 acts as a bridge, allowing complex binary information to be treated as simple text.</p>
      
      <h2>What is Base64?</h2>
      <p>At its core, Base64 is a way to translate binary data (like an image or a file) into a set of 64 characters. These characters include uppercase letters (A-Z), lowercase letters (a-z), numbers (0-9), and two additional symbols (+ and /). The equals sign (=) is often used as padding at the end of the string. The name "Base64" comes from the fact that it uses a base-64 number system, which is a power of two (2^6). This makes it particularly well-suited for computer systems that operate on binary logic.</p>
      
      <h2>How Does it Work?</h2>
      <p>The encoding process works by taking groups of three bytes (24 bits) of binary data and splitting them into four groups of six bits each. Each six-bit group represents a value from 0 to 63, which corresponds to one of the 64 characters in the Base64 alphabet. This results in a text string that is roughly 33% larger than the original binary data. While this increase in size might seem like a disadvantage, the benefit is that the resulting string is composed entirely of safe, printable characters that won't be misinterpreted by older protocols or text-based systems.</p>
      <p>For example, if you have a binary file that contains characters that might be interpreted as control characters (like "end of file" or "new line") by a certain system, encoding it in Base64 ensures that the system sees only standard letters and numbers. This prevents the data from being corrupted or causing errors during transmission.</p>
      
      <h2>Why Use Base64?</h2>
      <p>Base64 is useful because it allows binary data to be transmitted over systems that are designed to handle only text. For example, some older email systems or data formats may not support binary data directly. By encoding the data as Base64, you can ensure it remains intact during transmission. It is also frequently used in web development to optimize performance and simplify data handling.</p>
      
      <h3>Common Use Cases in Web Development</h3>
      <ul>
        <li><strong>Data URIs:</strong> Embedding small images, icons, or fonts directly into HTML or CSS files. This can reduce the number of HTTP requests a browser has to make, which can lead to faster page load times for small assets. However, it's important not to overdo this, as it increases the size of your CSS/HTML files.</li>
        <li><strong>Email Attachments:</strong> Encoding files so they can be sent as part of a text-based email message. The MIME standard uses Base64 to handle attachments in emails.</li>
        <li><strong>API Requests:</strong> Sending binary data (like a profile picture or a document) as part of a JSON or XML request. Since JSON is a text-based format, binary data must be encoded to be included.</li>
        <li><strong>Basic Authentication:</strong> Many APIs use Base64 to encode the username and password in the "Authorization" header. Note that this is NOT encryption; it's just encoding and can be easily reversed.</li>
      </ul>

      <h2>Base64 vs. Encryption</h2>
      <p>One of the most common misconceptions is that Base64 is a form of encryption. It is <strong>not</strong>. Encoding is a process of transforming data into a different format using a publicly known algorithm. It is designed to be easily reversible. Encryption, on the other hand, is designed to hide data from unauthorized parties using a secret key. If you encode a password in Base64, anyone who sees the string can decode it in seconds. Always use proper encryption methods (like AES or RSA) for sensitive data, and only use Base64 for data representation and transmission.</p>

      <h2>How to Encode and Decode Base64</h2>
      <p>Most modern programming languages have built-in functions for Base64 encoding and decoding. In JavaScript, you can use <code>btoa()</code> to encode and <code>atob()</code> to decode. However, these functions have limitations with Unicode characters. For a more robust and user-friendly experience, you can use our <Link to="/base64-tool" className="text-emerald-500 font-bold hover:underline">Base64 Tool</Link>. It handles various character sets and provides instant results directly in your browser, ensuring your data never leaves your device.</p>
      
      <h2>Conclusion</h2>
      <p>While Base64 encoding increases the size of your data, its ability to represent binary data as text makes it an invaluable tool in the web developer's toolkit. Whether you're optimizing a website's performance with Data URIs or building a robust API, understanding how Base64 works and when to use it can help you build more efficient and compatible applications. It's a fundamental concept that every modern developer should be familiar with.</p>
    </div>
  ),
  'generate-strong-passwords': (
    <div className="prose prose-zinc dark:prose-invert max-w-none">
      <p>In today's digital world, your password is the first line of defense against cyber threats. A weak password can be easily guessed or cracked by hackers, giving them access to your personal information, financial accounts, and more. This guide will show you how to generate strong, secure passwords that are virtually impossible to crack. We live in an era where data breaches are common occurrences, and the security of your online identity has never been more critical.</p>
      
      <h2>What Makes a Password Strong?</h2>
      <p>A strong password is one that is long, complex, and unique. Here are the key characteristics of a secure password that can withstand modern brute-force and dictionary attacks:</p>
      <ul>
        <li><strong>Length:</strong> Aim for at least 12-16 characters. The longer the password, the exponentially harder it is to crack. Every additional character adds a significant amount of entropy, making it more difficult for automated tools to guess the combination.</li>
        <li><strong>Complexity:</strong> Use a mix of uppercase and lowercase letters, numbers, and special symbols (e.g., !, @, #, $). This increases the character pool that a hacker's software must search through.</li>
        <li><strong>Uniqueness:</strong> Never reuse the same password for multiple accounts. This is perhaps the most important rule. If one account is compromised in a data breach, all your other accounts using that same password will be at risk. Hackers often use "credential stuffing" to try leaked passwords on hundreds of other sites.</li>
        <li><strong>Randomness:</strong> Avoid using easily guessable information like your name, birthdate, pet's name, or common words. A truly random string of characters is the most secure because it follows no predictable patterns.</li>
      </ul>
      
      <h2>The Danger of Common Passwords</h2>
      <p>Many people still use passwords like "123456", "password", or "qwerty". These are the first things hackers try. Even slightly more complex passwords that use common substitutions (like "P@ssw0rd") are easily cracked by modern software that is programmed to recognize these patterns. To be truly secure, your password should look like complete gibberish to a human.</p>

      <h2>How to Generate Strong Passwords</h2>
      <p>Creating a strong, random password manually can be difficult. Our brains are not very good at being truly random. Fortunately, there are tools and techniques you can use to make the process easier and more secure:</p>
      
      <h3>Use a Password Generator</h3>
      <p>Our <Link to="/random-string-generator" className="text-emerald-500 font-bold hover:underline">Random String Generator</Link> uses cryptographically secure algorithms to create truly random passwords in your browser. Unlike some online generators, our tool runs entirely on your device, meaning the passwords you generate are never sent over the internet or stored on our servers. You can customize the length and character types to meet the specific requirements of any website or application.</p>
      
      <h3>Use Passphrases</h3>
      <p>A passphrase is a series of random words that are easy for you to remember but hard for a computer to guess. For example, "Correct-Horse-Battery-Staple" is a famous example of a strong passphrase. The key is to choose words that have no logical connection to each other. This method provides high security while being much easier to type and remember than a string of random characters.</p>
      
      <h3>Use a Password Manager</h3>
      <p>A password manager is a secure application that stores and manages all your passwords for you. It can also generate strong passwords and automatically fill them in when you visit a site. This allows you to have a unique, complex password for every account without having to remember them all. Popular options include Bitwarden, 1Password, and Dashlane. Most modern browsers also have built-in password managers that are quite capable.</p>
      
      <h2>Two-Factor Authentication (2FA)</h2>
      <p>Even with a strong password, it's highly recommended to enable Two-Factor Authentication (2FA) whenever possible. 2FA adds an extra layer of security by requiring a second form of verification, such as a code sent to your phone or generated by an app like Google Authenticator. This means that even if a hacker manages to steal your password, they still won't be able to access your account without that second factor.</p>

      <h2>Conclusion</h2>
      <p>Generating strong passwords is one of the most important things you can do to protect your online security. By following these tips and using the right tools, you can keep your accounts safe and your personal information secure. Don't wait until you've been hacked to take your security seriously. Start using strong, unique passwords today and give yourself the peace of mind that comes with knowing your digital life is well-protected.</p>
    </div>
  ),
  'best-free-tools-developers': (
    <div className="prose prose-zinc dark:prose-invert max-w-none">
      <p>As a developer, your productivity is often tied to the tools you use. While there are many powerful (and expensive) software sites available, there are also many incredible free online tools that can help you streamline your workflow and build better applications. This guide explores some of the best free online tools for developers, focusing on utilities that offer high value without the need for complex setups or subscriptions.</p>
      
      <h2>1. QuickTools Pro: The All-in-One Solution</h2>
      <p>Of course, we have to mention our own site of tools! <Link to="/" className="text-emerald-500 font-bold hover:underline">QuickTools Pro</Link> offers a wide range of utilities for developers, including <Link to="/image-compressor" className="text-emerald-500 font-bold hover:underline">image compression</Link>, <Link to="/pdf-tools" className="text-emerald-500 font-bold hover:underline">PDF manipulation</Link>, <Link to="/password-strength" className="text-emerald-500 font-bold hover:underline">security tools</Link>, and more. What sets our platform apart is that all tools run locally in your browser. This means your data is never uploaded to a server, providing a level of privacy and speed that traditional online tools can't match. It's the perfect "Swiss Army Knife" for any developer's bookmarks.</p>
      
      <h2>2. JSON Formatter & Validator</h2>
      <p>Working with JSON data is a daily task for many developers, especially those working with APIs. A good <Link to="/dev-tools" className="text-emerald-500 font-bold hover:underline">JSON formatter</Link> can help you visualize and debug complex data structures by adding indentation and syntax highlighting. A validator is equally important, as it can catch small syntax errors (like a missing comma or a trailing bracket) that can cause your code to fail. Our developer tools section includes a robust JSON utility that makes this process effortless.</p>
      
      <h2>3. Base64 Encoder/Decoder</h2>
      <p>Whether you're embedding small images in CSS to reduce HTTP requests or sending binary data over a text-based API, a <Link to="/base64-tool" className="text-emerald-500 font-bold hover:underline">Base64 tool</Link> is essential. It allows you to quickly encode and decode data without having to write custom scripts. Our tool supports various character sets and provides instant feedback, making it a reliable choice for quick transformations.</p>
      
      <h2>4. QR Code Generator</h2>
      <p>QR codes are a versatile way to share URLs, text, and other information between physical and digital spaces. For developers, they can be useful for sharing test URLs with mobile devices or creating custom codes for marketing materials. A free <Link to="/qr-code" className="text-emerald-500 font-bold hover:underline">QR code generator</Link> that allows for customization and high-resolution downloads is a valuable asset. Our tool even includes a scanner, so you can verify codes directly from your browser.</p>
      
      <h2>5. Color Pickers & Converters</h2>
      <p>Design is an integral part of development. Finding the perfect color and converting it between different formats (HEX, RGB, HSL) is a common task. Online <Link to="/color-tool" className="text-emerald-500 font-bold hover:underline">color tools</Link> make this process fast and easy. Look for tools that offer a visual picker, color harmony suggestions, and easy copying of color codes. This can save you from having to open heavy design software for simple color adjustments.</p>

      <h2>6. Documentation and Learning Resources</h2>
      <p>No developer's toolkit is complete without reliable documentation. Sites like <strong>MDN Web Docs</strong> are essential for web developers, providing comprehensive information on HTML, CSS, and JavaScript. For learning new technologies, platforms like <strong>freeCodeCamp</strong> and <strong>web.dev</strong> offer high-quality tutorials and guides for free. Staying informed and continuously learning is the best way to improve your skills as a developer.</p>

      <h2>7. Version Control and Collaboration</h2>
      <p>While not strictly "online tools" in the same sense as a formatter, platforms like <strong>GitHub</strong> and <strong>GitLab</strong> offer free tiers that are incredibly powerful for version control and collaboration. They allow you to host your code, track changes, and work with others on open-source projects. Understanding Git and how to use these platforms is a fundamental requirement for modern software development.</p>
      
      <h2>Conclusion</h2>
      <p>The web is full of amazing free resources for developers. By incorporating these tools into your daily workflow, you can save time, reduce errors, and focus on what you do best: building great software. Remember that the best tools are the ones that fit seamlessly into your process and help you solve problems more efficiently. Explore, experiment, and build your own personalized toolkit of free online resources.</p>
    </div>
  ),
  'how-to-use-qr-generator': (
    <div className="prose prose-zinc dark:prose-invert max-w-none">
      <p>QR codes (Quick Response codes) have become a ubiquitous part of our daily lives, from restaurant menus to marketing posters. They offer a fast and convenient way to share information with anyone who has a smartphone. This guide will show you how to use a QR code generator to create your own custom codes and explore the various ways they can be used to enhance your projects and business.</p>
      
      <h2>What is a QR Code?</h2>
      <p>A QR code is a type of two-dimensional barcode that can store a variety of information, such as a URL, text, contact information, or even Wi-Fi credentials. Unlike traditional barcodes that store data in a single line, QR codes store data both horizontally and vertically. This allows them to hold significantly more information in a smaller space. When scanned with a smartphone camera, the code is instantly decoded, and the information is displayed or the action is performed, such as opening a website or adding a contact.</p>
      
      <h2>How to Generate a QR Code</h2>
      <p>Generating a QR code is a simple process that can be done in a few easy steps using our <Link to="/qr-code" className="text-emerald-500 font-bold hover:underline">QR Code Tool</Link>. Our tool is designed to be fast, secure, and easy to use, with all processing happening directly in your browser.</p>
      <ol>
        <li><strong>Select the Type of Information:</strong> Decide what you want your QR code to do. Do you want it to open a website, show a piece of text, or share your contact details?</li>
        <li><strong>Enter the Data:</strong> Type or paste the information you want to encode into the input field. For a URL, make sure to include the full address (e.g., https://www.example.com).</li>
        <li><strong>Customize Your Code:</strong> Many generators, including ours, allow you to customize the appearance of your QR code. You can often adjust the size, color, and even add a logo. Our tool also allows you to set the error correction level, which determines how much of the code can be damaged while still being scannable.</li>
        <li><strong>Generate and Preview:</strong> Click the generate button to see your custom code instantly. You can then test it with your own phone to make sure it works exactly as expected.</li>
        <li><strong>Download Your Code:</strong> Once you're happy with the result, download the QR code as an image file. We recommend using SVG for high-quality printing or PNG for web use.</li>
      </ol>
      
      <h2>Creative Ways to Use QR Codes</h2>
      <p>QR codes are incredibly versatile and can be used in many creative ways to bridge the gap between the physical and digital worlds:</p>
      <ul>
        <li><strong>Marketing Materials:</strong> Add QR codes to business cards, flyers, and posters to direct potential customers to your website, social media profiles, or a specific promotion.</li>
        <li><strong>Restaurant Menus:</strong> Replace physical menus with QR codes on tables, allowing customers to view the menu on their own devices. This is more hygienic and allows for easy updates.</li>
        <li><strong>Event Check-ins:</strong> Use QR codes on tickets to streamline the check-in process at events and conferences.</li>
        <li><strong>Product Packaging:</strong> Provide customers with more information about your products, such as user manuals, instructional videos, or origin stories, by adding a QR code to the packaging.</li>
        <li><strong>Wi-Fi Access:</strong> Create a QR code that automatically connects guests to your Wi-Fi network when scanned, eliminating the need to type in long passwords.</li>
      </ul>

      <h2>Best Practices for QR Codes</h2>
      <p>To ensure your QR codes are effective and easy to use, follow these best practices:</p>
      <ul>
        <li><strong>Test Your Code:</strong> Always scan your QR code with multiple devices and apps to ensure it works correctly before printing or sharing it. This is the most important step!</li>
        <li><strong>Keep it Simple:</strong> Avoid encoding too much information in a single code. The more data you include, the denser the code becomes, which can make it harder for some cameras to scan.</li>
        <li><strong>Provide a Clear Call to Action:</strong> Tell your users what will happen when they scan the code. A simple "Scan to view our menu" or "Scan for a special discount" can significantly increase engagement.</li>
        <li><strong>Use High Contrast:</strong> Ensure there is a clear contrast between the QR code (usually dark) and its background (usually light). Avoid using busy backgrounds or colors that are too similar.</li>
        <li><strong>Consider the Size:</strong> Make sure the QR code is large enough to be easily scanned. As a general rule, it should be at least 2cm x 2cm for print materials.</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>QR codes are a powerful and versatile tool for sharing information in the physical and digital worlds. By following these simple steps and best practices, you can create effective QR codes for any project or purpose. Whether you're a business owner looking to enhance customer engagement or a developer building a new application, QR codes offer a convenient and modern solution for data sharing. Explore our <Link to="/qr-code" className="text-emerald-500 font-bold hover:underline">QR Code Tool</Link> today and start creating your own custom codes!</p>
    </div>
  ),
};

export function BlogPost() {
  const { id } = useParams();
  const post = blogPosts.find(p => p.id === id);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const title = post.title;
    let shareUrl = '';

    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        alert('Link copied to clipboard!');
        return;
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <Helmet>
        <title>{post.title} | QuickTools Blog</title>
        <meta name="description" content={post.excerpt} />
      </Helmet>
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
            <button 
              onClick={() => handleShare('facebook')}
              className="h-10 w-10 rounded-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-emerald-500 transition-colors"
              aria-label="Share on Facebook"
            >
              <Facebook className="h-4 w-4" />
            </button>
            <button 
              onClick={() => handleShare('twitter')}
              className="h-10 w-10 rounded-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-emerald-500 transition-colors"
              aria-label="Share on Twitter"
            >
              <Twitter className="h-4 w-4" />
            </button>
            <button 
              onClick={() => handleShare('linkedin')}
              className="h-10 w-10 rounded-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-emerald-500 transition-colors"
              aria-label="Share on LinkedIn"
            >
              <Linkedin className="h-4 w-4" />
            </button>
            <button 
              onClick={() => handleShare('copy')}
              className="h-10 w-10 rounded-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-emerald-500 transition-colors"
              aria-label="Copy link"
            >
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
          to="/all-tools" 
          className="inline-flex items-center justify-center px-10 py-4 rounded-2xl bg-emerald-500 text-white font-black text-sm uppercase tracking-widest hover:scale-105 transition-all relative z-10"
        >
          Explore All Tools
        </Link>
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500 rounded-full blur-[120px]" />
        </div>
      </div>
    </div>
  );
}
