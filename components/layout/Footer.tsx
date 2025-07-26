import Image from 'next/image'

export default function Footer() {
    return (
      <footer className="text-black bg-white py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* social media and copyright */}
          <div className="flex flex-col md:flex-row justify-between items-center pb-6 border-b border-gray-600 mb-6">
            <div className="text-sm text-center md:text-left mb-4 md:mb-0">
              &copy; 2025 Hack4Impact, a 501(c)(3) nonprofit organization. EIN: 08-789456123
            </div>
            <div className="flex space-x-4">
              <a href="https://www.linkedin.com/company/hack4impact/?viewAsMember=true" className="rounded-full p-2">
                <Image src="/linkedin.svg" width={20} height={20}/>
              </a>
              <a href="https://www.instagram.com/hack4impact/" className="rounded-full p-2">
                <Image src="/insta.svg" width={20} height={20} />
              </a>
              <a href="https://www.youtube.com/@hack4impact" className="rounded-full p-2">
                <Image src="/yt.svg" width={20} height={20}/>
              </a>
              <a href="#" className="rounded-full p-2">
                <Image src="/substack.svg" width={20} height={20} />
              </a>
              <a href="https://github.com/hack4impact" className="rounded-full p-2">
                <Image src="/github.svg" width={20} height={20} />
              </a>
            </div>
          </div>
  
          {/* links with no references yet! */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div className="text-xs text-center md:text-left mb-4 md:mb-0 max-w-md">
            We use simple and privacy friendly anlaytics to measure the impact of our work.
            We honor no-track requests from your browser.
            </div>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-6 text-sm">
              <a href="#" className="hover:text-white transition-colors duration-200 rounded-md py-1 px-2 hover:bg-gray-700">Cookies</a>
              <a href="#" className="hover:text-white transition-colors duration-200 rounded-md py-1 px-2 hover:bg-gray-700">Terms of Use</a>
              <a href="#" className="hover:text-white transition-colors duration-200 rounded-md py-1 px-2 hover:bg-gray-700">Privacy Policy</a>
            </div>
          </div>
        </div>
      </footer>
    );
  };