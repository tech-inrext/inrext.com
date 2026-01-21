import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Inrext Private Limited",
  description:
    "Privacy Policy explaining how Inrext Private Limited collects, uses, stores, and protects personal information.",
};

function LockIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="mx-auto h-10 w-10 text-blue-500 mb-2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16.5 10.5V7.5a4.5 4.5 0 10-9 0v3m12 0A2.25 2.25 0 0121 12.75v6A2.25 2.25 0 0118.75 21H5.25A2.25 2.25 0 013 18.75v-6A2.25 2.25 0 015.25 10.5h13.5zm-6.75 3.75v2.25"
      />
    </svg>
  );
}

export default function PrivacyPolicyPage() {
  return (
    <section className="min-h-screen bg-[#f8fafc] flex flex-col  items-center py-10 px-2">
      {/* Blue Card with Lock and Title */}
      <div className="w-full max-w-5xl rounded-t-2xl bg-blue-50 mt-6 flex flex-col items-center pt-8 pb-6 shadow-md">
        <LockIcon />
        <h1 className="text-2xl sm:text-3xl font-bold text-blue-900 mb-1 text-center">Inrext Policy</h1>
      </div>
      {/* White Card with Policy Content */}
      <div className="w-full max-w-5xl bg-white rounded-b-2xl shadow-md px-6 sm:px-10 py-10 -mt-2">
        <h2 className="text-xl font-bold mb-2 text-gray-900 italic">Privacy Policy</h2>
        <p className="font-semibold  mb-8 text-gray-700">Inrext Private Limited</p>
        <div className="space-y-8 text-sm leading-7 text-gray-800">
          {/* ...existing code... */}
          <div>
            <h2 className="text-xl font-semibold italic mb-2">1. Introduction</h2>
            <p>
              This Privacy Policy ("Policy") describes how Inrext Private Limited
              ("Inrext", "Company", "We", "Us", or "Our") collects, uses, stores,
              processes, discloses, and protects personal information of users
              ("User", "You") while accessing or using
              <span className="font-medium"> www.inrext.com </span>("Site") and
              related services ("Services").
            </p>
            <p>
              This Policy forms an integral part of the Terms & Conditions of
              Inrext. By accessing or using the Site or Services, you consent to
              the practices described herein.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold italic mb-2">2. About Inrext Private Limited</h2>
            <p>
              Inrext Private Limited is a real estate consultancy and investment
              advisory company providing professional guidance across
              residential, commercial, farmland, and allied real estate segments.
            </p>
            <p className="mt-2">
              <strong>Registered / Head Office:</strong><br />
              3rd Floor, D4, Block D, Sector 10,<br />
              Noida, Uttar Pradesh – 201301, India<br />
              Phone: +91 8010178010<br />
              Email: info@inrext.com
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold italic mb-2">3. Information We Collect</h2>
            <p className="font-medium">A. Information Provided Directly by You</p>
            <ul className="list-disc ml-6 space-y-1">
              <li>Name, age, gender</li>
              <li>Mobile number and email address</li>
              <li>Residential or correspondence address</li>
              <li>City, state, PIN code</li>
              <li>Property preferences and investment interests</li>
              <li>Occupation and professional details</li>
              <li>Information submitted via enquiry or consultation forms</li>
            </ul>
            <p className="font-medium mt-4">B. Information Collected Automatically</p>
            <ul className="list-disc ml-6 space-y-1">
              <li>IP address</li>
              <li>Browser and device information</li>
              <li>Operating system</li>
              <li>Date, time, duration, and pages visited</li>
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-semibold italic mb-2">4. Cookies & Tracking</h2>
            <p>
              We use cookies and similar technologies to improve functionality,
              analyze usage, and enhance user experience. Disabling cookies may
              limit certain Site features.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold italic mb-2">5. Third-Party Sources</h2>
            <p>
              We may receive information from marketing partners, analytics
              providers (such as Google Analytics), or referral sources, used
              strictly in accordance with this Policy.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold italic mb-2">6. Use of Information</h2>
            <ul className="list-disc ml-6 space-y-1">
              <li>Provide and improve services</li>
              <li>Respond to enquiries and consultation requests</li>
              <li>Coordinate site visits and discussions</li>
              <li>Share relevant project or market information</li>
              <li>Ensure legal and regulatory compliance</li>
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-semibold italic mb-2">7. Information Sharing</h2>
            <p>
              We do not sell personal data. Information may be shared with
              internal teams, trusted service providers, developers (where
              necessary), or authorities as required by law.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold italic mb-2">8. Public Information</h2>
            <p>
              Information voluntarily shared in public areas of the Site may be
              visible to others and is not considered confidential.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold italic mb-2">9. Access & Data Rights</h2>
            <p>
              Users may request access, correction, or deletion of personal data
              by emailing info@inrext.com, subject to legal and operational
              requirements.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold italic mb-2">10. Data Retention</h2>
            <p>
              Personal data is retained only as long as necessary for business,
              legal, or compliance purposes. Backup data may persist temporarily.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold italic mb-2">11. Data Security</h2>
            <p>
              We implement reasonable security measures including access
              controls, secure servers, and limited personnel access. However,
              no system is completely secure.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold italic mb-2">12. Third-Party Links</h2>
            <p>
              Inrext is not responsible for privacy practices of third-party
              websites linked on the Site.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold italic mb-2">13. User Responsibility</h2>
            <p>
              Users are responsible for maintaining confidentiality of their
              information and ensuring accuracy of submitted data.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold italic mb-2">14. Policy Updates</h2>
            <p>
              This Policy may be updated periodically. Continued use of the Site
              constitutes acceptance of the revised Policy.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold italic mb-2">15. Grievance Redressal</h2>
            <p>
              <strong>Grievance Officer – Inrext Private Limited</strong><br />
              Email: info@inrext.com<br />
              Phone: +91 8010178010<br />
              Address: 3rd Floor, D4, Block D, Sector 10, Noida – 201301
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold italic mb-2">16. Governing Law</h2>
            <p>
              This Privacy Policy is governed by the laws of India, including the
              Digital Personal Data Protection Act, 2023. Courts at New Delhi
              shall have exclusive jurisdiction.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}