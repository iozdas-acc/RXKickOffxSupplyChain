import { PageWrapper, RevealText } from '../components/AnimatedSection'

export default function Terms() {
  return (
    <PageWrapper>
      <section className="pt-36 pb-24 md:pt-44 md:pb-32">
        <div className="max-w-3xl mx-auto px-6">
          <RevealText className="mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4 tracking-tight">Terms of Service</h1>
            <p className="text-lg text-gray-500">Last updated: March 2026</p>
          </RevealText>

          <div className="prose prose-gray max-w-none space-y-8 text-gray-600 leading-relaxed">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3 font-heading">1. Acceptance of Terms</h2>
              <p>By accessing and using the Innovation X website, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website.</p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3 font-heading">2. Use of the Website</h2>
              <p>This website is provided for informational purposes about Innovation X, Kidovation and Future Labs educational programs. You may use the site for lawful purposes only.</p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3 font-heading">3. Intellectual Property</h2>
              <p>All content on this website, including text, graphics, logos, images and software, is the property of Innovation X and is protected by applicable intellectual property laws. You may not reproduce, distribute or modify any content without our written permission.</p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3 font-heading">4. Programs and Events</h2>
              <p>Details about our programs, workshops and events are provided for general information. We reserve the right to modify, postpone or cancel programs at our discretion. Specific terms and conditions may apply to individual programs.</p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3 font-heading">5. User Submissions</h2>
              <p>When you submit information through our contact form, you grant us permission to use that information to respond to your enquiry and for related administrative purposes.</p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3 font-heading">6. Limitation of Liability</h2>
              <p>Innovation X shall not be liable for any indirect, incidental, special or consequential damages arising from your use of this website or participation in our programs, to the fullest extent permitted by law.</p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3 font-heading">7. Governing Law</h2>
              <p>These terms shall be governed by and construed in accordance with the laws of England and Wales.</p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3 font-heading">8. Contact</h2>
              <p>For any questions regarding these Terms of Service, please contact us at <a href="mailto:hello@innovationx.com" className="text-ix-purple hover:underline">hello@innovationx.com</a>.</p>
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}
