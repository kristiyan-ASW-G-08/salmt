import Logo from '@/components/Logo';
import FooterColumn from './FooterColumn';
const navigation = [
  {
    href: '/faq',
    label: 'FAQ',
  },
  {
    href: '/privacy-policy',
    label: 'Privacy Policy',
  },
  {
    href: '/terms-of-service',
    label: 'Terms of Service',
  },
  {
    href: '/pricing',
    label: 'Pricing',
  },
];
export interface FooterColumnProps {
  title: string;
  navigation: {
    label: string;
    href: string;
  }[];
}

const Footer = () => (
  <footer
    className="grid  gap-10 pt-md pb-lg px-md lg:px-lg bg-light-background-primary dark:bg-dark-background-primary shadow-lg border-t-4 border-light-background-contrast dark:border-dark-background-contrast w-screen min-h-fit justify-items-start justify-start"
    style={{
      gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 200px) )',
    }}
  >
    <div className="grid content-start h-full ">
      <Logo />
    </div>
    <FooterColumn title={'About'} navigation={navigation} />
    <FooterColumn title={'Product'} navigation={navigation} />
  </footer>
);

export default Footer;
