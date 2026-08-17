import type { Metadata } from 'next';
import { SavedCodes } from './_components/SavedCodes';

export const metadata: Metadata = {
  title: 'My codes',
};

export default function MyCodesPage() {
  return <SavedCodes />;
}
