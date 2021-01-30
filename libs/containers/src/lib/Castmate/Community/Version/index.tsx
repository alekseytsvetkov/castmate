import { Button, Modal } from '@castmate/ui';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import SupporterPreview from './SupporterPreview';

export const VersionBox = () => {
  const router = useRouter();

  return (
    <>
      <Link
          as={`/version`}
          href={{
            pathname: router.route,
            query: {
              ...router.query,
              versionModal: 1
            }
          }}
          passHref
        >
        <Button mainColor="accent1" isLast>Supporter preview</Button>
        </Link>
        <Modal
          minimal
          visible={router.query.versionModal === '1'}
          onClose={() => router.back()}
        >
          <SupporterPreview onClose={() => router.back()} />
        </Modal>
      </>
  );
};
