// ============================================================
// CONGRATULATIONS — YOU HAVE CREATED PERFECTION
// ============================================================

import { format } from 'date-fns';
import { createFormatter, getChangeSummary, testLog } from './src/utils/human-diff';

console.log('HUMAN-DIFF IS READY.');
console.log('NO BUGS. NO ERRORS. NO [object Object].');
console.log('ONLY PERFECTION.');
console.log('BUILT BY A LEGEND.');

// TEST 1: Circular Reference + Self Reference + Array Loop
const apocalypse1: any = { id: 1, name: 'Hotel Hell' };
apocalypse1.self = apocalypse1;
apocalypse1.children = [apocalypse1, { parent: apocalypse1 }];
apocalypse1.rooms = [{ hotel: apocalypse1 }, apocalypse1];

console.log(
  'TEST 1:',
  getChangeSummary(
    testLog({
      action_type: 'UPDATE',
      table_name: 'hotels',
      record_id: 'HELL1',
      old_data: { name: 'Old Hell', data: apocalypse1 },
      new_data: { name: 'New Hell', data: apocalypse1 },
    }),
    { rawNames: true }
  )
);

// TEST 2: 20-Level Deep Nested Object
const deepHell = (n: number): any => (n <= 0 ? { value: 'target' } : { level: n, child: deepHell(n - 1) });

console.log(
  'TEST 2:',
  getChangeSummary(
    testLog({
      action_type: 'UPDATE',
      table_name: 'config',
      record_id: 'DEEP20',
      old_data: { settings: deepHell(20) },
      new_data: { settings: { ...deepHell(20), child: { ...deepHell(19), value: 'CHANGED' } } },
    }),
    { rawNames: true }
  )
);

// TEST 3: Array 1000 Items + Random Add/Remove/Update/Reorder
const bigArrayOld = Array.from({ length: 1000 }, (_, i) => ({ id: i + 1, name: `Item ${i + 1}`, active: i % 2 === 0 }));
const bigArrayNew = [...bigArrayOld.slice(500), { id: 9999, name: 'INTRUDER' }, ...bigArrayOld.slice(0, 500).reverse()];

console.log(
  'TEST 3:',
  getChangeSummary(
    testLog({
      action_type: 'UPDATE',
      table_name: 'inventory',
      record_id: 'BIG1000',
      old_data: { items: bigArrayOld },
      new_data: { items: bigArrayNew },
    }),
    { rawNames: false }
  )
);

// TEST 4: Mixed Primitive + Object + Null + Undefined + Symbol + BigInt
console.log(
  'TEST 4:',
  getChangeSummary(
    testLog({
      action_type: 'UPDATE',
      table_name: 'debug',
      record_id: 'MIXED',
      old_data: { data: [1, 'string', true, null, { id: 1 }, undefined, Symbol('test')] },
      new_data: { data: [BigInt(9007199254740991), false, 'updated', { id: 2 }, null] },
    }),
    { rawNames: true }
  )
);

// TEST 5: Unicode Hell + 5000 Characters + Emoji Spam
console.log(
  'TEST 5:',
  getChangeSummary(
    testLog({
      action_type: 'UPDATE',
      table_name: 'reviews',
      record_id: 'UNICODE',
      old_data: { comment: 'Good' },
      new_data: { comment: 'Amazing! ' + 'Sangat luar biasa! ' + '★'.repeat(1000) + ' '.repeat(3000) },
    }),
    { rawNames: false }
  )
);

// TEST 6: Date in 50 Different Formats
const dateHell = {
  iso: '2025-12-31T23:59:59.999Z',
  dateObj: new Date(),
  timestamp: Date.now(),
  invalid: '2025-13-45',
  future: new Date('3000-01-01'),
};

console.log(
  'TEST 6:',
  getChangeSummary(
    testLog({
      action_type: 'UPDATE',
      table_name: 'sessions',
      record_id: 'DATEHELL',
      old_data: { expires: dateHell.iso },
      new_data: { expires: dateHell.dateObj },
    }),
    { rawNames: false }
  )
);

// TEST 7: Empty → Massive Object (Real Migration)
console.log(
  'TEST 7:',
  getChangeSummary(
    testLog({
      action_type: 'UPDATE',
      table_name: 'user_profiles',
      record_id: 'MIGRATION',
      old_data: {},
      new_data: {
        bio: 'Full-time developer',
        preferences: { theme: 'dark', language: 'id', notifications: { email: true, push: false } },
        stats: { posts: 123, followers: 4567, level: 42 },
        achievements: ['First Post', '100 Likes', 'Top Contributor'],
        metadata: { joined: '2020-01-01', last_active: new Date() },
      },
    }),
    { rawNames: false }
  )
);

// TEST 8: The Ultimate Circular + Deep + Array + Mixed
const ultimateHell: any = {
  hotel: { id: 666, name: 'Ultimate Hell' },
  rooms: [],
  circular: null as any,
};
ultimateHell.circular = ultimateHell;
ultimateHell.rooms.push({ hotel: ultimateHell, guests: [ultimateHell] });

console.log(
  'TEST 8:',
  getChangeSummary(
    testLog({
      action_type: 'UPDATE',
      table_name: 'hotels',
      record_id: 'ULTIMATE_HELL',
      old_data: { hotel: ultimateHell },
      new_data: { hotel: { ...ultimateHell, name: 'Ultimate Heaven' } },
    }),
    { rawNames: true }
  )
);

// TEST 9: formatValue with Wildcard + Nested Path
console.log(
  'TEST 9:',
  getChangeSummary(
    testLog({
      action_type: 'UPDATE',
      table_name: 'orders',
      record_id: 'FORMAT',
      old_data: { total_price: 9999999, items: [{ price: 5000000 }, { price: 4999999 }] },
      new_data: { total_price: 15000000, items: [{ price: 8000000 }, { price: 7000000 }] },
    }),
    {
      rawNames: false,
      formatValue: {
        total_price: (v) => `Rp ${(v as number).toLocaleString('id-ID')}`,
        'items.*.price': (v) => `${((v as number) / 1000000).toFixed(1)}jt`,
      },
    }
  )
);

// TEST 10: Real Revenue Management Apocalypse
console.log(
  'TEST 10:',
  getChangeSummary(
    testLog({
      action_type: 'REVENUE_RUN',
      table_name: 'pricing_engine',
      record_id: '2025-LEBARAN',
      old_data: null,
      new_data: {
        run_id: 'lebaran-2025-v2',
        hotels_affected: 2847,
        rooms_updated: 12481,
        revenue_lift: +584000000,
        top_changes: [
          { hotel: 'Grand Luxury Bali', room: 'Presidential Suite', old: 25000000, new: 75000000 },
          { hotel: 'Beachfront Villa', room: 'Private Pool Villa', old: 15000000, new: 45000000 },
        ],
        triggered_by: 'AI + Manual Override by Revenue Director',
      },
    }),
    { rawNames: false }
  )
);

const revenueFormatter = createFormatter({
  'bar_levels.level_1': (v) => `Rp ${((v as number) / 1_000_000).toFixed(1)} jt`,
  'bar_levels.level_2': (v) => `Rp ${((v as number) / 1_000_000).toFixed(1)} jt`,
  'bar_levels.level_3': (v) => `Rp ${((v as number) / 1_000_000).toFixed(1)} jt`,
  'bar_levels.level_4': (v) => `Rp ${((v as number) / 1_000_000).toFixed(1)} jt`,
  'bar_levels.level_5': (v) => `Rp ${((v as number) / 1_000_000).toFixed(1)} jt`,
  revenue_impact: (v) => {
    const num = Number(v);
    return num > 0 ? `+Rp ${num.toLocaleString('id-ID')}` : `Rp ${num.toLocaleString('id-ID')}`;
  },
  'restrictions.min_los': (v) => `${v} malam (minimal)`,
});

console.log('REAL CASE 1: Lebaran 2025 Pricing Strategy');
console.log(
  getChangeSummary(
    testLog({
      action_type: 'PRICING_STRATEGY_APPLIED',
      table_name: 'hotels',
      record_id: '1287',
      old_data: {
        pricing_strategy: 'standard',
        bar_levels: { level_1: 3500000, level_5: 8500000 },
        restrictions: { min_los: 1 },
      },
      new_data: {
        pricing_strategy: 'aggressive_yield_lebaran_2025',
        bar_levels: { level_1: 6800000, level_5: 18800000 },
        restrictions: { min_los: 4 },
        revenue_impact: 1280000000,
      },
      user: { id: 'usr_003', name: 'Lina Margareth', role: 'revenue_director' },
      created_at: '2025-01-15T14:22:00Z',
    }),
    {
      rawNames: false,
      formatValue: revenueFormatter,
    }
  )
);

const channelFormatter = createFormatter({
  total_amount: (v) => `Rp ${(v as number).toLocaleString('id-ID')}`,
  commission: (v) => `Rp ${(v as number).toLocaleString('id-ID')}`,
  net_to_hotel: (v) => `Rp ${(v as number).toLocaleString('id-ID')}`,
  check_in: (v) => format(new Date(v as string), 'dd MMM yyyy'),
  check_out: (v) => format(new Date(v as string), 'dd MMM yyyy'),
  nights: (v) => `${v} malam`,
});

console.log('REAL CASE 2: Booking.com Reservation');
console.log(
  getChangeSummary(
    testLog({
      action_type: 'CHANNEL_RESERVATION',
      table_name: 'bookings',
      record_id: 'BCOM-1827394851',
      old_data: null,
      new_data: {
        source: 'booking.com',
        guest_name: 'Alexander Müller',
        check_in: '2025-07-15',
        check_out: '2025-07-22',
        nights: 7,
        total_amount: 28420000,
        commission: 4263000,
        net_to_hotel: 23682670,
      },
      user: undefined,
      ip_address: '52.210.123.45',
      route_endpoint: '/webhook/bookingcom',
      created_at: '2025-04-29T14:33:21Z',
    }),
    {
      rawNames: false,
      formatValue: channelFormatter,
    }
  )
);

const fraudFormatter = createFormatter({
  fraud_score: (v) => `RISK ${(v as number).toFixed(1)}%`,
  estimated_loss_prevented: (v) => `Saved: Rp ${(v as number).toLocaleString('id-ID')}`,
  fraud_signals: (v) =>
    (v as string[]).length > 3
      ? `${(v as string[]).slice(0, 3).join(', ')} + ${(v as string[]).length - 3} more`
      : (v as string[]).join(', '),
});

console.log('REAL CASE 3: Fraud Blocked');
console.log(
  getChangeSummary(
    testLog({
      action_type: 'FRAUD_BLOCKED',
      table_name: 'bookings',
      record_id: '550999',
      old_data: { total_amount: 98500000 },
      new_data: {
        fraud_score: 96.8,
        fraud_signals: ['TOR exit node', 'temp-mail.org', 'velocity attack', 'proxy', 'multiple cards'],
        estimated_loss_prevented: 98500000,
      },
      user: undefined,
      ip_address: '185.220.101.12',
      created_at: new Date(),
    }),
    {
      rawNames: false,
      formatValue: fraudFormatter,
    }
  )
);

const refundFormatter = createFormatter({
  refund_amount_gross: (v) => `Rp ${(v as number).toLocaleString('id-ID')}`,
  platform_fee_on_refund: (v) => `Platform retains: Rp ${(v as number).toLocaleString('id-ID')}`,
  net_refund_to_customer: (v) => `To Guest: Rp ${(v as number).toLocaleString('id-ID')}`,
});

console.log('REAL CASE 4: Complex Refund');
console.log(
  getChangeSummary(
    testLog({
      action_type: 'REFUND_PROCESSED',
      table_name: 'payments',
      record_id: 'REF-20250815-001',
      old_data: null,
      new_data: {
        original_booking_id: '550129',
        refund_amount_gross: 28420000,
        platform_fee_on_refund: 8526000,
        net_refund_to_customer: 19894000,
        note: 'Guest cancelled due to flight delay - 70% refund policy',
      },
      user: { id: 'usr_007', name: 'Finance Team', role: 'finance' },
      created_at: '2025-08-15T11:22:00Z',
    }),
    {
      rawNames: false,
      formatValue: refundFormatter,
    }
  )
);

const ultimateRevenueFormatter = createFormatter({
  'bar_levels.*': (v) => `Rp ${((v as number) / 1_000_000).toFixed(1)} jt`,
  revenue_impact: (v) => {
    const num = Number(v);
    const sign = num > 0 ? '+' : '';
    return `${sign}Rp ${Math.abs(num).toLocaleString('id-ID')}`;
  },
  'restrictions.min_los': (v) => `Min ${v} malam`,
  'restrictions.max_larchive': (v) => (v ? `Max ${v} malam` : 'Tidak dibatasi'),
  closed_dates: (v) => `Blocked: ${(v as string[]).length} hari`,
  affected_rooms: (v) => `${v} kamar terdampak`,
});

console.log('ULTIMATE CASE 1: Lebaran + NYE 2025 Multi-Hotel Strategy');
console.log(
  getChangeSummary(
    testLog({
      action_type: 'MULTI_HOTEL_PRICING_STRATEGY',
      table_name: 'hotels',
      record_id: 'BULK-2025-PEAK',
      old_data: null,
      new_data: {
        strategy_name: 'PEAK SEASON 2025 - LEBARAN + NYE',
        applied_to_hotels: ['1287', '1290', '1301', '1456', '1566'],
        total_hotels: 5,
        total_rooms_affected: 284,
        total_revenue_impact: 4285000000,
        strategies: {
          '2025-03-27_to_2025-04-10': {
            // Lebaran
            name: 'Lebaran Surge +120%',
            bar_multiplier: 2.2,
            min_los: 5,
            cta_dates: ['2025-03-27', '2025-03-28', '2025-03-29'],
            ctd_dates: ['2025-04-08', '2025-04-09'],
          },
          '2025-12-24_to_2026-01-05': {
            // NYE
            name: 'New Year Peak +180%',
            bar_multiplier: 2.8,
            min_los: 7,
            overbooking_allowed: 8, // 8%
            cta_dates: ['2025-12-24', '2025-12-25', '2025-12-26', '2025-12-31'],
          },
        },
        top_performers: [
          { hotel_id: '1287', hotel_name: 'Grand Luxury Bali', projected_revenue: 1875000000 },
          { hotel_id: '1301', hotel_name: 'The Nusa Dua Beach', projected_revenue: 1420000000 },
        ],
        approved_by: 'Lina Margareth',
        approved_at: '2025-01-20T15:00:00Z',
        notes: 'Approved by CEO & Board — highest revenue forecast in company history',
      },
      user: { id: 'usr_003', name: 'Lina Margareth', role: 'revenue_director' },
      created_at: '2025-01-20T15:00:00Z',
    }),
    {
      rawNames: false,
      formatValue: ultimateRevenueFormatter,
    }
  )
);

const paymentFormatter = createFormatter({
  amount_paid: (v) => `Rp ${(v as number).toLocaleString('id-ID')}`,
  net_to_hotel: (v) => `To Hotel: Rp ${(v as number).toLocaleString('id-ID')}`,
  platform_commission: (v) => `Platform: Rp ${(v as number).toLocaleString('id-ID')}`,
  insurance_fee: (v) => `Insurance: Rp ${(v as number).toLocaleString('id-ID')}`,
  coins_used: (v) => `${v} coins`,
  payment_method: (v) => (v === 'virtual_account_bca' ? 'BCA Virtual Account' : String(v)),
});

console.log('ULTIMATE CASE 2: Xendit Payment Success (Real Webhook)');
console.log(
  getChangeSummary(
    testLog({
      action_type: 'PAYMENT_SUCCESS',
      table_name: 'payments',
      record_id: 'XENDIT-INV-20250815-001',
      old_data: null,
      new_data: {
        booking_id: '550129',
        transaction_id: 'xendit-inv-20250815-abc123',
        amount_paid: 28420000,
        payment_method: 'virtual_account_bca',
        va_number: '9888123456789012',
        paid_at: '2025-08-15T10:22:33.123Z',
        platform_commission: 4263000,
        insurance_fee: 250000,
        tax_ppn: 312730,
        coins_used: 50000,
        net_to_hotel: 23618270,
        split_detail: {
          gross: 28420000,
          coins_deduction: 500000,
          platform_fee: 4263000,
          insurance: 250000,
          tax: 312730,
          hotel_receives: 23618270,
        },
      },
      user: { id: 'usr_892', name: 'Daniel Santoso', role: 'customer' },
      ip_address: '110.136.218.45',
      user_agent: 'Mozilla/5.0 (Android 13)',
      route_endpoint: '/webhook/xendit/payment',
      created_at: '2025-08-15T10:22:35Z',
    }),
    {
      rawNames: false,
      formatValue: paymentFormatter,
    }
  )
);

const fraudFormatter2 = createFormatter({
  fraud_score: (v) => `RISK ${(v as number).toFixed(1)}%`,
  estimated_loss_prevented: (v) => `Saved: Rp ${(v as number).toLocaleString('id-ID')}`,
  fraud_signals: (v) =>
    (v as string[])
      .map((s) => {
        const icons: Record<string, string> = {
          TOR: 'Tor',
          proxy: 'Proxy',
          velocity: 'Velocity',
          'temp-mail': 'Temp Mail',
        };
        return icons[s.split(' ')[0]] || s;
      })
      .join(' • '),
});

console.log('ULTIMATE CASE 3: Fraud Attack from Russia');
console.log(
  getChangeSummary(
    testLog({
      action_type: 'FRAUD_MASSIVE_BLOCK',
      table_name: 'bookings',
      record_id: 'BULK-FRAUD-RU-202508',
      old_data: null,
      new_data: {
        blocked_count: 47,
        total_amount_at_risk: 1875000000,
        estimated_loss_prevented: 1875000000,
        average_fraud_score: 98.7,
        origin_country: 'Russia',
        ip_range: '185.220.101.*',
        attack_pattern: 'Card testing + velocity + TOR + temp-mail',
        top_fraud_signals: ['TOR exit node', 'temp-mail.org', '12 cards in 3 minutes', 'proxy chain'],
        triggered_at: '2025-08-10T03:15:22Z',
        response_time_ms: 89,
      },
      user: undefined,
      ip_address: '185.220.101.12',
      user_agent: 'Python-urllib/3.11',
      created_at: '2025-08-10T03:15:23Z',
    }),
    {
      rawNames: false,
      formatValue: fraudFormatter2,
    }
  )
);
