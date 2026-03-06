// Availability data for Ivan & Vlada
// Format: 'YYYY-MM-DD': { status: 'available' | 'busy', who: 'Ivan' | 'Vlada' | 'Both' }
// Or simple format: 'YYYY-MM-DD': 'busy' (means both are busy)
// If a date is not specified, it will be shown as available by default

const availabilityData = {
    // March 2026 - Examples
    '2026-03-10': { status: 'busy', who: 'Ivan' },
    '2026-03-11': { status: 'busy', who: 'Ivan' },
    '2026-03-12': { status: 'busy', who: 'Ivan' },
    '2026-03-13': { status: 'busy', who: 'Ivan' },
    '2026-03-14': { status: 'busy', who: 'Ivan' },
    '2026-03-15': { status: 'busy', who: 'Ivan' },
    '2026-05-29': { status: 'busy', who: 'Both' },
    '2026-05-30': { status: 'busy', who: 'Both' },
    '2026-05-31': { status: 'busy', who: 'Both' },
    '2026-06-01': { status: 'busy', who: 'Both' },
    '2026-06-02': { status: 'busy', who: 'Both' },
    '2026-06-03': { status: 'busy', who: 'Both' },
    '2026-06-04': { status: 'busy', who: 'Both' },
    '2026-06-05': { status: 'busy', who: 'Both' },
    '2026-06-06': { status: 'busy', who: 'Both' },

};

// Last update date
const lastUpdateDate = '2026-03-06';
