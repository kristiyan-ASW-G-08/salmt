'server only';
import { Metadata } from 'next';
import Authentication from '@/sections/Authnetication';

export const metadata: Metadata = {
  title: 'Authentication',
  description:
    'ResumeWiz: Create professional resumes with ease. Access a wide range of templates and customize your resume to showcase your skills and qualifications. Build your perfect resume effortlessly with ResumeWiz.',
  keywords: [
    'Resume creation',
    'Job application',
    'CV builder',
    'Professional templates',
    'Skill showcase',
    'Career advancement',
    'Employment opportunities',
    'Personal branding',
    'Resume optimization',
    'ATS-friendly resumes',
  ],
  applicationName: 'ResumeWiz',
};

const AuthPage = () => <Authentication />;

export default AuthPage;
