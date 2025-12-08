import { error } from '@sveltejs/kit';
import { findNavItem } from '$lib/data/navigation';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
    const { category, slug } = params;
    
    const navItem = findNavItem(category, slug);
    
    if (!navItem) {
        throw error(404, 'Page not found');
    }
    
    return {
        category: navItem.category,
        item: navItem.item,
    };
};
