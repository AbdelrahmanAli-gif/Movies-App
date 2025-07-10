'use client';

import { Suspense } from 'react';
import ExploreClient from '@/components/ExploreClient';
import Spinner from '@/components/Spinner';

const ExplorePage = () => {
    return (
        <Suspense fallback={<Spinner />}>
            <ExploreClient />
        </Suspense>
    );
};

export default ExplorePage;
