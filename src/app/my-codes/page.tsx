import type { Metadata } from 'next';
import { MyCodesView } from './MyCodesView';

export const metadata: Metadata = {
  title: 'My codes',
};

export default function MyCodesPage() {
  return <MyCodesView />;
}
