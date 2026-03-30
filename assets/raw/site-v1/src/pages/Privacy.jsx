import { PageWrapper, RevealText } from '../components/AnimatedSection'

export default function Privacy() {
  return (
    <PageWrapper>
      <section className="pt-36 pb-24 md:pt-44 md:pb-32">
        <div className="max-w-3xl mx-auto px-6">
          <RevealText className="mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4 tracking-tight">Privacy Policy</h1>
            <p className="text-lg text-gray-500">Last updated: March 2026</p>
          </RevealText>

          <div className="prose prose-gray max-w-none space-y-8 text-gray-600 leading-relaxed">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3 font-heading">1. Introduction</h2>
              <p>Innovation X ("we", "us", or "our") is committed to protecting the privacy of all users, especially young people. This Privacy Policy explains how we collect, use and safeguard your information when you visit our website.</p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3 font-heading">2. Information We Collect</h2>
              <p>We may collect information you provide directly, such as your name, email address and message when you use our contact form. We do not collect personal data from children without parental consent.</p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3 font-heading">3. How We Use Your Information</h2>
              <p>We use the information we collect to respond to your enquiries, provide our educational services, improve our website and communicate with you about programs and events.</p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3 font-heading">4. Data Sharing</h2>
              <p>We do not sell, trade or rent your personal information to third parties. We may share data with trusted service providers who assist us in operating our website, solely to support our operations.</p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3 font-heading">5. Data Security</h2>
              <p>We implement appropriate technical and organisational measures to protect your personal data against unauthorised access, alteration, disclosure or destruction.</p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3 font-heading">6. Your Rights</h2>
              <p>You have the right to access, correct or delete your personal data. To exercise these rights, please contact us at <a href="mailto:hello@innovationx.com" className="text-ix-purple hover:underline">hello@innovationx.com</a>.</p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3 font-heading">7. Changes to This Policy</h2>
              <p>We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date.</p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3 font-heading">8. Contact Us</h2>
              <p>If you have any questions about this Privacy Policy, please contact us at <a href="mailto:hello@innovationx.com" className="text-ix-purple hover:underline">hello@innovationx.com</a>.</p>
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}
