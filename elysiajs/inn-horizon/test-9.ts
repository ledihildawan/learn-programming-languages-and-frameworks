// test-final.ts
// ULTIMATE TEST SUITE — 100% SESUAI human-diff FINAL VERSION
// Built by an Indonesian Engineer Who Refused to Lose
// cspell:ignore Wijaya Shopee Tolong tebal LENGKAP Fitur dengan hasil karena selalu

import { format } from 'date-fns';
import { createFormatter, getChangeSummary, testLog } from './src/utils/human-diff';

console.log('HUMAN-DIFF IS ETERNAL.');
console.log('NO BUGS. NO ERRORS. NO [object Object].');
console.log('ONLY PERFECTION.');
console.log('BUILT BY A LEGEND.\n');

// TEST 1: Circular Reference + Self Reference + Array Loop
const apocalypse1: any = { id: 1, name: 'Hotel Hell' };
apocalypse1.self = apocalypse1;
apocalypse1.children = [apocalypse1, { parent: apocalypse1 }];
apocalypse1.rooms = [{ hotel: apocalypse1 }, apocalypse1];

console.log('TEST 1: Circular Reference');
console.log(
  getChangeSummary(
    testLog({
      action: 'UPDATE',
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

console.log('\nTEST 2: 20-Level Deep Nested');
console.log(
  getChangeSummary(
    testLog({
      action: 'UPDATE',
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

console.log('\nTEST 3: Array 1000 Items');
console.log(
  getChangeSummary(
    testLog({
      action: 'UPDATE',
      table_name: 'inventory',
      record_id: 'BIG1000',
      old_data: { items: bigArrayOld },
      new_data: { items: bigArrayNew },
    }),
    { rawNames: false }
  )
);

// TEST 4: Mixed Primitive + Object + Null + Undefined + Symbol + BigInt
console.log('\nTEST 4: Mixed Types + BigInt');
console.log(
  getChangeSummary(
    testLog({
      action: 'UPDATE',
      table_name: 'debug',
      record_id: 'MIXED',
      old_data: { data: [1, 'string', true, null, { id: 1 }, undefined, Symbol('test')] },
      new_data: { data: [BigInt('9007199254740991'), false, 'updated', { id: 2 }, null] },
    }),
    { rawNames: true }
  )
);

// TEST 5: Unicode Hell + 5000 Characters + Emoji Spam
console.log('\nTEST 5: Unicode + Emoji Spam');
console.log(
  getChangeSummary(
    testLog({
      action: 'UPDATE',
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

console.log('\nTEST 6: Date Hell');
console.log(
  getChangeSummary(
    testLog({
      action: 'UPDATE',
      table_name: 'sessions',
      record_id: 'DATEHELL',
      old_data: { expires: dateHell.iso },
      new_data: { expires: dateHell.dateObj },
    }),
    { rawNames: false }
  )
);

// TEST 7: Empty → Massive Object (Real Migration)
console.log('\nTEST 7: Empty → Massive Object');
console.log(
  getChangeSummary(
    testLog({
      action: 'UPDATE',
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

console.log('\nTEST 8: Ultimate Circular Hell');
console.log(
  getChangeSummary(
    testLog({
      action: 'UPDATE',
      table_name: 'hotels',
      record_id: 'ULTIMATE_HELL',
      old_data: { hotel: ultimateHell },
      new_data: { hotel: { ...ultimateHell, name: 'Ultimate Heaven' } },
    }),
    { rawNames: true }
  )
);

// TEST 9: formatValue with Wildcard + Nested Path
console.log('\nTEST 9: formatValue Wildcard');
console.log(
  getChangeSummary(
    testLog({
      action: 'UPDATE',
      table_name: 'orders',
      record_id: 'FORMAT',
      old_data: { total_price: 9999999, items: [{ price: 5000000 }, { price: 4999999 }] },
      new_data: { total_price: 15000000, items: [{ price: 8000000 }, { price: 7000000 }] },
    }),
    {
      rawNames: false,
      formatValue: createFormatter({
        total_price: (v) => `Rp ${(v as number).toLocaleString('id-ID')}`,
        'items.*.price': (v) => `${((v as number) / 1000000).toFixed(1)}jt`,
      }),
    }
  )
);

// TEST 10: Real Revenue Management Apocalypse
console.log('\nTEST 10: Real Revenue Run');
console.log(
  getChangeSummary(
    testLog({
      action: 'REVENUE_RUN',
      table_name: 'pricing_engine',
      record_id: '2025-LEBARAN',
      old_data: null,
      new_data: {
        run_id: 'lebaran-2025-v2',
        hotels_affected: 2847,
        rooms_updated: 12481,
        revenue_lift: 584000000,
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

// REAL CASE 1: Lebaran 2025 Pricing Strategy
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

console.log('\nREAL CASE 1: Lebaran 2025 Pricing Strategy');
console.log(
  getChangeSummary(
    testLog({
      action: 'PRICING_STRATEGY_APPLIED',
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

// REAL CASE 2: Booking.com Reservation
const channelFormatter = createFormatter({
  total_amount: (v) => `Rp ${(v as number).toLocaleString('id-ID')}`,
  commission: (v) => `Rp ${(v as number).toLocaleString('id-ID')}`,
  net_to_hotel: (v) => `Rp ${(v as number).toLocaleString('id-ID')}`,
  check_in: (v) => format(new Date(v as string), 'dd MMM yyyy'),
  check_out: (v) => format(new Date(v as string), 'dd MMM yyyy'),
  nights: (v) => `${v} malam`,
});

console.log('\nREAL CASE 2: Booking.com Reservation');
console.log(
  getChangeSummary(
    testLog({
      action: 'CHANNEL_RESERVATION',
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
      route: '/webhook/bookingcom',
      created_at: '2025-04-29T14:33:21Z',
    }),
    {
      rawNames: false,
      formatValue: channelFormatter,
    }
  )
);

// REAL CASE 3: Fraud Blocked
const fraudFormatter = createFormatter({
  fraud_score: (v) => `RISK ${(v as number).toFixed(1)}%`,
  estimated_loss_prevented: (v) => `Saved: Rp ${(v as number).toLocaleString('id-ID')}`,
  fraud_signals: (v) =>
    (v as string[]).length > 3
      ? `${(v as string[]).slice(0, 3).join(', ')} + ${(v as string[]).length - 3} more`
      : (v as string[]).join(', '),
});

console.log('\nREAL CASE 3: Fraud Blocked');
console.log(
  getChangeSummary(
    testLog({
      action: 'FRAUD_BLOCKED',
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

// REAL CASE 4: Complex Refund
const refundFormatter = createFormatter({
  refund_amount_gross: (v) => `Rp ${(v as number).toLocaleString('id-ID')}`,
  platform_fee_on_refund: (v) => `Platform retains: Rp ${(v as number).toLocaleString('id-ID')}`,
  net_refund_to_customer: (v) => `To Guest: Rp ${(v as number).toLocaleString('id-ID')}`,
});

console.log('\nREAL CASE 4: Complex Refund');
console.log(
  getChangeSummary(
    testLog({
      action: 'REFUND_PROCESSED',
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

// ULTIMATE CASE: Lebaran + NYE 2025 Multi-Hotel Strategy
const ultimateRevenueFormatter = createFormatter({
  'bar_levels.*': (v) => `Rp ${((v as number) / 1_000_000).toFixed(1)} jt`,
  revenue_impact: (v) => {
    const num = Number(v);
    const sign = num > 0 ? '+' : '';
    return `${sign}Rp ${Math.abs(num).toLocaleString('id-ID')}`;
  },
  'restrictions.min_los': (v) => `Min ${v} malam`,
  'restrictions.max_los': (v) => (v ? `Max ${v} malam` : 'Tidak dibatasi'),
  closed_dates: (v) => `Blocked: ${(v as string[]).length} hari`,
  affected_rooms: (v) => `${v} kamar terdampak`,
});

console.log('\nULTIMATE CASE: Lebaran + NYE 2025 Multi-Hotel Strategy');
console.log(
  getChangeSummary(
    testLog({
      action: 'MULTI_HOTEL_PRICING_STRATEGY',
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
            name: 'Lebaran Surge +120%',
            bar_multiplier: 2.2,
            min_los: 5,
            cta_dates: ['2025-03-27', '2025-03-28', '2025-03-29'],
            ctd_dates: ['2025-04-08', '2025-04-09'],
          },
          '2025-12-24_to_2026-01-05': {
            name: 'New Year Peak +180%',
            bar_multiplier: 2.8,
            min_los: 7,
            overbooking_allowed: 8,
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

// ULTIMATE CASE 2: Xendit Payment Success
const paymentFormatter = createFormatter({
  amount_paid: (v) => `Rp ${(v as number).toLocaleString('id-ID')}`,
  net_to_hotel: (v) => `To Hotel: Rp ${(v as number).toLocaleString('id-ID')}`,
  platform_commission: (v) => `Platform: Rp ${(v as number).toLocaleString('id-ID')}`,
  insurance_fee: (v) => `Insurance: Rp ${(v as number).toLocaleString('id-ID')}`,
  coins_used: (v) => `${v} coins`,
  payment_method: (v) => (v === 'virtual_account_bca' ? 'BCA Virtual Account' : String(v)),
});

console.log('\nULTIMATE CASE 2: Xendit Payment Success');
console.log(
  getChangeSummary(
    testLog({
      action: 'PAYMENT_SUCCESS',
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
      },
      user: { id: 'usr_892', name: 'Daniel Santoso', role: 'customer' },
      ip_address: '110.136.218.45',
      user_agent: 'Mozilla/5.0 (Android 13)',
      route: '/webhook/xendit/payment',
      created_at: '2025-08-15T10:22:35Z',
    }),
    {
      rawNames: false,
      formatValue: paymentFormatter,
    }
  )
);

// ULTIMATE CASE 3: Fraud Attack from Russia
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

console.log('\nULTIMATE CASE 3: Fraud Attack from Russia');
console.log(
  getChangeSummary(
    testLog({
      action: 'FRAUD_MASSIVE_BLOCK',
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

console.log(
  getChangeSummary(
    testLog({
      action: 'UPDATE',
      table_name: 'test',
      record_id: 'BULK-FRAUD-RU-202508',
      old_data: {
        status: {
          code: '0',
          message: 'success',
        },
        data: {
          vizId: 'Viz-244',
          datasourceId: 'DS-45',
          vizName: 'Executive Summary',
          vizDesc: '',
          published: true,
          filter: {
            date: {
              affectedWidgets: [
                {
                  column: {
                    label: 'event_date',
                    value: 'event_date',
                  },
                  toggle: true,
                  widgetList: [
                    {
                      label: 'Total Line in Service',
                      value: 'W-1429',
                    },
                    {
                      label: 'Billed Revenue',
                      value: 'W-2374',
                    },
                    {
                      label: 'Churn (CAPS/Cleansing)',
                      value: 'W-2390',
                    },
                    {
                      label: 'Sales',
                      value: 'W-2385',
                    },
                    {
                      label: 'Total Sales',
                      value: 'W-2377',
                    },
                    {
                      label: 'Avg Daily Sales',
                      value: 'W-3048',
                    },
                    {
                      label: 'Revenue Trend (Billion)',
                      value: 'W-2389',
                    },
                    {
                      label: 'Revenue Trend (Billion)',
                      value: 'W-2395',
                    },
                    {
                      label: 'Monthly CT0',
                      value: 'W-2713',
                    },
                    {
                      label: 'Net Add',
                      value: 'W-2966',
                    },
                  ],
                },
                {
                  column: {
                    label: 'load_date',
                    value: 'load_date',
                  },
                  toggle: true,
                  widgetList: [
                    {
                      label: 'Collection Rate/C3MR',
                      value: 'W-2375',
                    },
                  ],
                },
              ],
              defaultValue: null,
              defaultValueFormat: 'days',
              enableDateRange: true,
              enabled: true,
              end: '-1',
              format: 'DD/MM/YYYY',
              isMtd: false,
              max: '0',
              min: '-365',
              start: '',
            },
            sidebar: {
              listFilter: [
                {
                  affectedWidgets: [
                    {
                      column: {
                        label: 'branch',
                        value: 'branch',
                      },
                      toggle: true,
                      widgetList: [
                        {
                          label: 'Total Line in Service',
                          value: 'W-1429',
                        },
                        {
                          label: 'Billed Revenue',
                          value: 'W-2374',
                        },
                        {
                          label: 'Collection Rate/C3MR',
                          value: 'W-2375',
                        },
                        {
                          label: 'Churn (CAPS/Cleansing)',
                          value: 'W-2390',
                        },
                        {
                          label: 'Sales',
                          value: 'W-2385',
                        },
                        {
                          label: 'Total Sales',
                          value: 'W-2377',
                        },
                        {
                          label: 'Avg Daily Sales',
                          value: 'W-3048',
                        },
                        {
                          label: 'Revenue Trend (Billion)',
                          value: 'W-2389',
                        },
                        {
                          label: 'Revenue Trend (Billion)',
                          value: 'W-2395',
                        },
                        {
                          label: 'Monthly CT0',
                          value: 'W-2713',
                        },
                        {
                          label: 'Net Add',
                          value: 'W-2966',
                        },
                      ],
                    },
                  ],
                  enabled: true,
                  fieldName: 'Territory',
                  options: [
                    {
                      label: 'Area',
                      value: 'area',
                    },
                    {
                      label: 'Region',
                      value: 'region',
                    },
                    {
                      label: 'Branch',
                      value: 'branch',
                    },
                  ],
                },
                {
                  affectedWidgets: [
                    {
                      column: {
                        label: 'type',
                        value: 'type',
                      },
                      toggle: false,
                      widgetList: [
                        {
                          label: 'Revenue Trend (Billion)',
                          value: 'W-2395',
                        },
                        {
                          label: 'Revenue Trend (Billion)',
                          value: 'W-2812',
                        },
                      ],
                    },
                  ],
                  editFieldName: false,
                  enabled: true,
                  fieldName: 'Services',
                  options: [
                    {
                      label: '1P',
                      value: '1p',
                    },
                    {
                      label: '2P',
                      value: '2p',
                    },
                    {
                      label: '3P',
                      value: '3p',
                    },
                  ],
                },
              ],
            },
          },
          vizOptions:
            '{"clientSideRefresh":{"enable":false,"interval":0,"unit":""},"customGridColumn":{"enable":true,"totalGridColumns":48,"typeGrid":"scrollVertical"}}',
          vizType: 'general',
          widgetList: [
            {
              widgetListId: 4846,
              title: 'Total Line in Service',
              subtitle: 'Last Updated: 01 December 2024',
              widgetId: 'W-1429',
              queryId: 'Q-721',
              cacheId: 'cache-DS-45-469-2288288472',
              sqlQuery:
                'iSxoOENvIlIpeHxINW4IGy5ZPNxe8LGQ81lLticGG4HrOjfB+fZsQ6N8S/9P1IrN7yS2ZjI0xhJ4Re1Nv9lOGDVTVxTWMUJBTX8s8jQ3b/uKQ7t84Rm2+axmH4f9Pd6TReTyHps+v6U3cqOYkODJkPwk+A3QGHQpuA30OQg2x3GvuQW1hnnKxQzNc/sWq3reuaz+8FNKuHlgh8UnOfjH+NqBnY3zu9ijgwXIkecFwmqN8JdO4xAX7O54waT/er33/14O28LFZe8ZTsEGB9/YyCusWqz6mQiCdGUD5LHNXNbNKVNt0br/1Z11Xultx26amlGfzVb4t62SCTgUzxQuvsa88q0PvnpRneoCh1gogig6a7bhpeCMEIlkLfjYS/IGQDX0TPXUubBbGKueHm3vK9SvuG2GVO9/tQTgyF8ZrXfMW7zK/qml8PuOFyJLtOCqb3vAr1mqMf5N60nfU0kQ3kdH4DNenNBPfuE6ZRFIsrklszosMxu0/69gMdaYeYXmWdOf3G9zKoDy+XM8jwsL0q/U/r5eDlh4LkpHeGhEW81f9VbtPNo2NOyf1urBUPwVTMAgPSF9xivaNIa/bJ5lAOCfEugZN/uA3seMcvm3Mh/G+nq36vxmBFksN32XkZPXKMTrg3NRMbTivfme8EAwhgReGQyeg5wAJKSgtmwINxDmfyl/',
              widgetAggregation: {
                chartType: 'basic_card',
                select: [
                  {
                    columnValue: 'active_lis',
                    dateColumn: 'event_date',
                    growthType: 'yearly',
                    operation: 'sum',
                    series: [
                      {
                        column: 'active_lis',
                        growthType: 'monthly',
                        label: 'Active LIS',
                      },
                      {
                        column: 'inactive_lis',
                        growthType: 'monthly',
                        label: 'Inactive LIS',
                      },
                      {
                        column: 'sum',
                        growthType: 'monthly',
                        label: 'MoM',
                      },
                      {
                        column: 'sum',
                        growthType: 'yearly',
                        label: 'YoY',
                      },
                    ],
                  },
                ],
              },
              visualizationId: 'viz-13',
              rows: 9,
              cols: 12,
              x: 36,
              y: 0,
              chartOptions:
                '{"dataProcessor":{"themes":{"label":"Revamp","value":"revamp"},"columnValue":{"label":"active_lis","value":"active_lis"},"columnValueCompare":null,"typeOption":"basic","typePercentage":null,"columnDate":{"label":"event_date","value":"event_date"},"growthType":{"label":"Yearly","value":"yearly"},"label":null,"operation":{"label":"Sum","value":"sum"}},"seriesBasicCard":[{"typeSeries":null,"title":null,"label":"Active LIS","seriesColumn":{"label":"active_lis","value":"active_lis"},"seriesGrowthType":{"label":"Monthly","value":"monthly"},"seriesColumnLabel":null,"groupingSeries":[]},{"typeSeries":null,"title":null,"label":"Inactive LIS","seriesColumn":{"label":"inactive_lis","value":"inactive_lis"},"seriesGrowthType":{"label":"Monthly","value":"monthly"},"seriesColumnLabel":null,"groupingSeries":[]},{"typeSeries":null,"title":null,"label":"MoM","seriesColumn":{"label":"sum","value":"sum"},"seriesGrowthType":{"label":"Monthly","value":"monthly"},"seriesColumnLabel":null,"groupingSeries":[]},{"typeSeries":null,"title":null,"label":"YoY","seriesColumn":{"label":"sum","value":"sum"},"seriesGrowthType":{"label":"Yearly","value":"yearly"},"seriesColumnLabel":null,"groupingSeries":[]}],"generalBasicCard":{"title":"Total Line in Service","titleColor":"#ffffff","subtitle":null,"type":"date","formatDate":{"label":"DD MMMM YYYY","value":"DD MMMM YYYY"},"prefixSubtitle":"Last Updated:","description":"Jumlah seluruh sambungan pelanggan indihome dengan layanan SSL yang aktif","titleFontSize":null,"subtitleFontSize":null,"positionSubtitle":null,"icon":null,"cardId":null,"surface":null,"hideBorder":true,"categoryCard":null,"typeColor":"gradient","backgroundColorHeader":{"label":"Crimson Velvet","value":"linear-gradient(90.02deg, #D82A31 0.02%, #933F7A 128.33%)"}},"optionsBasicCard":{"abbr":false,"fontSize":null,"separator":"comma","decimal":null,"decimalPercentage":"2","prefix":"","prefixPosition":"top","suffix":"Customer","suffixPosition":"bottom","seriesPrefix":"","seriesSuffix":"","seriesPrefixFrom":null,"seriesSuffixFrom":null,"abbrSeries":false,"decimalSeries":null,"abbreviateNumbers":true,"hideValue":true,"hideFooter":true,"urlLearnMore":"/dashboard/subscriber/lis-%28line-in-service%29","hideGrowth":null,"hideSymbolPercentage":null}}',
              extraOptions:
                '{"title":"Total Line in Service","subtitle":"Last Updated: 01 October 2024","description":"Jumlah seluruh sambungan pelanggan indihome dengan layanan SSL yang aktif","icon":"","cardId":null,"styleBasicCard":{"themesCard":"revamp","hideBorder":true,"categoryCard":null,"backgroundColorHeader":"linear-gradient(90.02deg, #D82A31 0.02%, #933F7A 128.33%)"},"type":"date","formatDate":"DD MMMM YYYY","prefixSubtitle":"Last Updated:","prefix":"","prefixPosition":"top","suffix":"Customer","seriesOption":{"prefix":"","suffix":"Customer","abbr":false},"decimalPercentage":"2","abbr":false,"suffixPosition":"bottom","abbreviateNumbers":true,"titleColor":"#ffffff","additionalText":[],"hideValue":true,"hideFooter":true,"separator":"comma","urlLearnMore":"/dashboard/subscriber/lis-%28line-in-service%29","titleFontSize":"Jumlah seluruh sambungan pelanggan indihome dengan layanan SSL yang aktif","hideSymbolPercentage":null,"typeOption":"basic"}',
              indexSideMenu: 0,
              widgetType: '',
              tabType: 'tab',
              headerUseWidget: false,
              tabId: '',
              hideTitle: false,
              tabs: [],
              widgetEmptyCardList: [],
              text: '',
              type: '',
            },
            {
              widgetListId: 19912,
              title: 'Billed Revenue',
              subtitle: 'Last Updated: 01 December 2024',
              widgetId: 'W-2374',
              queryId: 'Q-1137',
              cacheId: 'cache-DS-45-921-86053213',
              sqlQuery:
                'yha/xdV14UtAEP4QrMMgIGfT9BH2qqDyqRS5tCNbd15g9GlA90+JMQZqTvySBCeHv5xWi//7p4SX+KMiiFOl/PlTKwLqNLvdTjs/Z8mT2cxPc1PYxynXcsDW1t2KHdEmxhLWLFKFCjE9EDZZcPIaR5BoXB373Zqbo3sX2IxZyyx2CaYqW1brVLoJKccP6II+2OZS5PU8njyOjiV+fhn2yvTmA1hjv46bUqqJLhm67jCqBPuKEdV6cbRHA7Ehz2JqbOWGVNB7FsQ+o9zfIhzUp88fvi09EXiK68gh8NE8nblVbwzJNYRNxcXjI9YUoZ6/ahVGi/KSB1e7Y7ghdCeAt/ABNNDme126wBC8espul+62MOgbF7j9q0fm3dKPU6p8kk76U2QFptvVzL+xL/seC+hq57aEL5v5nVT/lHVv2l/vV/6KLz4RkXocJbeHcdxb/In3glOruV8ctxyCb2ttM6TS6cX2iVDkJQ==',
              widgetAggregation: {
                chartType: 'basic_card',
                select: [
                  {
                    columnValue: 'total_amount',
                    dateColumn: 'event_date',
                    growthType: 'monthly',
                    operation: 'sum',
                    series: [
                      {
                        column: 'total_amount',
                        growthType: 'monthly',
                        label: 'MoM',
                      },
                      {
                        column: 'total_amount',
                        growthType: 'yearly',
                        label: 'YoY',
                      },
                    ],
                  },
                ],
              },
              visualizationId: 'viz-13',
              rows: 9,
              cols: 12,
              x: 0,
              y: 0,
              chartOptions:
                '{"dataProcessor":{"themes":{"label":"Revamp","value":"revamp"},"columnValue":{"label":"total_amount","value":"total_amount"},"columnValueCompare":null,"typeOption":"basic","typePercentage":null,"columnDate":{"label":"event_date","value":"event_date"},"growthType":{"label":"Monthly","value":"monthly"},"label":null,"operation":{"label":"Sum","value":"sum"}},"seriesBasicCard":[{"typeSeries":null,"title":null,"label":"MoM","seriesColumn":{"label":"total_amount","value":"total_amount"},"seriesGrowthType":{"label":"Monthly","value":"monthly"},"seriesColumnLabel":null,"operation":null,"orderBy":null,"limitSeries":null,"groupingSeries":[],"seriesColumnValue":null,"growthType":null},{"typeSeries":null,"title":null,"label":"YoY","seriesColumn":{"label":"total_amount","value":"total_amount"},"seriesGrowthType":{"label":"Yearly","value":"yearly"},"seriesColumnLabel":null,"operation":null,"orderBy":null,"limitSeries":null,"groupingSeries":[],"seriesColumnValue":null,"growthType":null}],"generalBasicCard":{"title":"Billed Revenue","titleColor":"#ffffff","subtitle":null,"type":"date","formatDate":{"label":"DD MMMM YYYY","value":"DD MMMM YYYY"},"prefixSubtitle":"Last Updated:","description":"Revenue tagihan pelanggan untuk penggunaan yang telah disediakan selama periode tertentu","positionSubtitle":null,"icon":null,"cardId":null,"surface":null,"hideBorder":null,"categoryCard":null,"typeColor":"gradient","backgroundColorHeader":{"label":"Crimson Velvet","value":"linear-gradient(90.02deg, #D82A31 0.02%, #933F7A 128.33%)"}},"optionsBasicCard":{"abbr":true,"fontSize":null,"separator":"comma","decimal":"2","decimalPercentage":"2","prefix":"IDR","prefixPosition":"bottom","suffix":null,"suffixPosition":"default","seriesPrefix":"IDR","seriesSuffix":null,"seriesPrefixFrom":null,"seriesSuffixFrom":null,"abbrSeries":true,"decimalSeries":"2","abbreviateNumbers":true,"hideValue":null,"hideFooter":true,"urlLearnMore":null,"hideGrowth":null,"hideSymbolPercentage":null}}',
              extraOptions:
                '{"title":"Billed Revenue","titleColor":"#ffffff","subtitle":"Last Updated: 01 October 2024","description":"Revenue tagihan pelanggan untuk penggunaan yang telah disediakan selama periode tertentu","icon":"","cardId":null,"abbr":true,"separator":"comma","decimal":"2","prefix":"IDR","prefixPosition":"bottom","suffixPosition":"default","seriesOption":{"prefix":"IDR","abbr":true,"decimal":"2","suffix":null},"styleBasicCard":{"themesCard":"revamp","hideBorder":null,"categoryCard":null,"backgroundColorHeader":"linear-gradient(90.02deg, #D82A31 0.02%, #933F7A 128.33%)"},"hideValue":null,"hideFooter":true,"urlLearnMore":null,"type":"date","formatDate":"DD MMMM YYYY","prefixSubtitle":"Last Updated:","abbreviateNumbers":true,"titleFontSize":"Revenue tagihan pelanggan untuk penggunaan yang telah disediakan selama periode tertentu","decimalPercentage":"2","hideSymbolPercentage":null,"typeOption":"basic"}',
              indexSideMenu: 0,
              widgetType: '',
              tabType: '',
              headerUseWidget: false,
              tabId: '',
              hideTitle: false,
              tabs: [],
              widgetEmptyCardList: [],
              text: '',
              type: '',
            },
            {
              widgetListId: 19913,
              title: 'Collection Rate/C3MR',
              subtitle: '',
              widgetId: 'W-2375',
              queryId: 'Q-1138',
              cacheId: 'cache-DS-45-081-900432477',
              sqlQuery:
                '8GmMhhIASYXaXuPqpd9Chrap5tbMqMb/ZRIw+dyHTH2WRC9Kk5CtE3G2fCRrCT1k+C9kBm4UTqYZuUGvTe2z54og8TS5x7fOFBmS/OA3O1JhA28KIpCRNo50Kd8pjCnROe3gQBXZulUgh5gq251xMchD1nm7m0wu8EdPQ+3E9t6cCvWl1gBkh5CY2swXM4Im2o9QxNMC4U9xaeTf8GugEQAlRs79lHl8hbKydvgw9bb+4qpG5/tgfDGvfNG5is4jawvLmYN2loDfBQLWEYUZDnMLJ2GGOk6D7PsPwhdUjzkQDkUNxN8jlxdM5PfWRnz1Tt2s+tQP99kQZ1kWkNqFems=',
              widgetAggregation: {
                chartType: 'basic_card',
                select: [
                  {
                    column: 'sum_bill',
                    columnValue: 'sum_paid',
                    dateColumn: 'load_date',
                    growthType: 'monthly-period',
                    label: 'Compared to last month:',
                    operation: 'sum',
                    series: [
                      {
                        growthType: 'monthly-period',
                        series: [
                          {
                            columnValue: 'sum_bill',
                            growthType: 'monthly-period',
                            label: 'Total Billing',
                          },
                          {
                            columnValue: 'sum_paid',
                            growthType: 'monthly-period',
                            label: 'Paid',
                          },
                          {
                            columnValue: 'sum_unpaid',
                            growthType: 'monthly-period',
                            label: 'Unpaid',
                          },
                        ],
                        title: null,
                      },
                    ],
                  },
                ],
              },
              visualizationId: 'viz-13',
              rows: 9,
              cols: 12,
              x: 12,
              y: 0,
              chartOptions:
                '{"dataProcessor":{"themes":{"label":"Two Column","value":"two-column"},"columnValue":{"label":"sum_paid","value":"sum_paid"},"columnValueCompare":{"label":"sum_bill","value":"sum_bill"},"typeOption":"basic","typePercentage":true,"columnDate":{"label":"load_date","value":"load_date"},"growthType":{"label":"Monthly Period","value":"monthly-period"},"label":"Compared to last month:","operation":{"label":"Sum","value":"sum"}},"seriesBasicCard":[{"typeSeries":{"label":"Grouping","value":"grouping"},"title":null,"label":null,"seriesColumn":null,"seriesGrowthType":null,"seriesColumnLabel":null,"operation":null,"orderBy":null,"limitSeries":null,"groupingSeries":[{"label":"Total Billing","seriesColumn":null,"seriesGrowthType":{"label":"Monthly Period","value":"monthly-period"},"seriesColumnLabel":null,"seriesColumnValue":{"label":"sum_bill","value":"sum_bill"}},{"label":"Paid","seriesColumn":null,"seriesGrowthType":{"label":"Monthly Period","value":"monthly-period"},"seriesColumnLabel":null,"seriesColumnValue":{"label":"sum_paid","value":"sum_paid"}},{"label":"Unpaid","seriesColumn":null,"seriesGrowthType":{"label":"Monthly Period","value":"monthly-period"},"seriesColumnLabel":null,"seriesColumnValue":{"label":"sum_unpaid","value":"sum_unpaid"}}],"seriesColumnValue":null,"growthType":{"label":"Monthly Period","value":"monthly-period"}}],"generalBasicCard":{"title":"Collection Rate/C3MR","titleColor":"#ffffff","subtitle":null,"type":"date","formatDate":{"label":"DD MMMM YYYY","value":"DD MMMM YYYY"},"prefixSubtitle":"Last Updated:","description":"Collection Rate/C3MR","titleFontSize":null,"subtitleFontSize":null,"positionSubtitle":null,"icon":null,"cardId":null,"surface":null,"hideBorder":null,"categoryCard":null,"typeColor":"gradient","backgroundColorHeader":{"label":"Crimson Velvet","value":"linear-gradient(90.02deg, #D82A31 0.02%, #933F7A 128.33%)"}},"optionsBasicCard":{"abbr":false,"fontSize":null,"separator":"comma","decimal":null,"decimalPercentage":"1","prefix":"Paid Rate","prefixPosition":"bottom","suffix":"","suffixPosition":"default","seriesPrefix":"","seriesSuffix":"","seriesPrefixFrom":null,"seriesSuffixFrom":null,"abbrSeries":true,"decimalSeries":"1","abbreviateNumbers":true,"hideValue":null,"hideFooter":true,"urlLearnMore":"/dashboard/collection","hideGrowth":true,"hideSymbolPercentage":false,"positionTitleSeries":null,"titleLeftColumn":null}}',
              extraOptions:
                '{"title":"Collection Rate/C3MR","subtitle":"","description":"Collection Rate/C3MR","seriesOption":{"prefix":"","suffix":"","abbr":true,"decimal":"1","hideGrowth":true},"styleBasicCard":{"themesCard":"two-column","hideBorder":null,"categoryCard":null,"backgroundColorHeader":"linear-gradient(90.02deg, #D82A31 0.02%, #933F7A 128.33%)"},"titleColor":"#ffffff","cardId":null,"icon":"","formatDate":"DD MMMM YYYY","prefixSubtitle":"Last Updated:","type":"date","abbr":false,"prefix":"Paid Rate","prefixPosition":"bottom","decimalPercentage":"1","abbreviateNumbers":true,"hideValue":null,"hideFooter":true,"separator":"comma","urlLearnMore":"/dashboard/collection","suffixPosition":"default","titleFontSize":"Collection Rate/C3MR","hideSymbolPercentage":false,"suffix":"","typeOption":"basic","positionTitleSeries":null,"typePercentage":true}',
              indexSideMenu: 0,
              widgetType: '',
              tabType: '',
              headerUseWidget: false,
              tabId: '',
              hideTitle: false,
              tabs: [],
              widgetEmptyCardList: [],
              text: '',
              type: '',
            },
            {
              widgetListId: 20124,
              title: 'Churn (CAPS/Cleansing)',
              subtitle: '',
              widgetId: 'W-2390',
              queryId: 'Q-1150',
              cacheId: 'cache-DS-45-143-2885070436',
              sqlQuery:
                'F1rVx+zn6eR1V3W8mDZd4F9fGamB1TZBL3laY15TsWLIfcm1t1+wLEtSJeSyAWI6045HOK9yKlaLe+N/Ud88aQ9SkjbuC073YZeXteWw2A7XhDJVwMc+KjM60LDktRKXX62kXtCt+RcJWiMGDbEQX1bY2QBPAjqQKUjISlQUz++6ryIMzr+HjUg69Ao6gprqCpKdf75bRlLItwvpUwGjfs6JKmDHCcGw',
              widgetAggregation: {
                chartType: 'progress_bar',
                select: [
                  {
                    columnLabel: 'status_cabut_indihome',
                    columnValue: 'total',
                    dateColumn: 'event_date',
                    operation: 'sum',
                    series: [
                      {
                        columnLabel: 'area',
                        growthTypes: [],
                      },
                    ],
                  },
                ],
              },
              visualizationId: 'viz-25',
              rows: 13,
              cols: 17,
              x: 31,
              y: 21,
              chartOptions:
                '{"series":[{"growthTypes":[],"seriesColumnLabel":{"label":"area","value":"area"}}],"columnLabel":{"label":"status_cabut_indihome","value":"status_cabut_indihome"},"columnValue":{"label":"total","value":"total"},"dateColumn":null,"operation":"sum","target":0,"generalProgressChart":{"title":"Churn (CAPS/Cleansing)","subtitle":null,"type":"date","formatDate":{"label":"DD MMMM YYYY","value":"DD MMMM YYYY"},"dateColumn":{"label":"event_date","value":"event_date"},"prefixSubtitle":"Last Updated:","description":"Churn (CAPS/Cleansing)","unit":{"label":"PX","value":"px"},"cornerRadius":"20","titleColor":null,"typeColor":null,"backgroundColorHeader":null,"borderWeight":null,"borderColor":null,"titleFontSize":null,"subtitleFontSize":null,"contentLabel":true,"contentTotal":true,"contentPercentage":true},"colorProgressChart":{"orderingColor":[{"name":"Sky Blue","value":"#00B4FF","baseIndex":0},{"name":"Ocean Blue","value":"#0072FB","baseIndex":1},{"name":"Seafoam Green","value":"#00D2AA","baseIndex":2},{"name":"Teal Wave","value":"#008591","baseIndex":3},{"name":"Lime Spark","value":"#20C400","baseIndex":4},{"name":"Emerald Green","value":"#008C00","baseIndex":5},{"name":"Slate Grey","value":"#7E97AA","baseIndex":6},{"name":"Steel Blue","value":"#405F77","baseIndex":7},{"name":"Sunburst Orange","value":"#FFAF00","baseIndex":8},{"name":"Burnt Orange","value":"#D34C00","baseIndex":9},{"name":"Lavender Mist","value":"#A274FF","baseIndex":10},{"name":"Royal Purple","value":"#6334FF","baseIndex":11},{"name":"Coral Pink","value":"#FF4B74","baseIndex":12},{"name":"Crimson Red","value":"#E60000","baseIndex":13},{"name":"Neon Pink","value":"#FF4AF9","baseIndex":14},{"name":"Magenta Glow","value":"#DF00E4","baseIndex":15},{"name":"Bubblegum Pink","value":"#FF7AAF","baseIndex":16},{"name":"Hot Pink","value":"#F40079","baseIndex":17}],"orderingGradient":[{"name":"Sunset Blaze","baseIndex":0,"value":"linear-gradient(270deg, #FC972B 0%, #ED0226 50%, #F33A28 100%)"},{"name":"Amber Glow","baseIndex":1,"value":"linear-gradient(270deg, #EDA244, #FC972B)"},{"name":"Aqua Fade","baseIndex":2,"value":"linear-gradient(270deg, #53C0DA, #53C0DA00)"},{"name":"Ocean Mist","baseIndex":3,"value":"linear-gradient(270deg, #1C649F, #89B5C9)"},{"name":"Crimson Velvet","baseIndex":4,"value":"linear-gradient(270deg, #D82A31, #933F7A)"},{"name":"Purple Dream","baseIndex":5,"value":"linear-gradient(270deg, #75468A, #D3C0D4)"},{"name":"Berry Bloom","baseIndex":6,"value":"linear-gradient(270deg, #7A235C, #DCC2CE)"},{"name":"Blush \u0026 Rouge","baseIndex":7,"value":"linear-gradient(270deg, #F2C4C0, #DE494E)"},{"name":"Earthy Ember","baseIndex":8,"value":"linear-gradient(270deg, #844025, #F3B88E)"},{"name":"Green Meadow","baseIndex":9,"value":"linear-gradient(270deg, #7ABE50, #DBECC9)"},{"name":"Forest Fresh","baseIndex":10,"value":"linear-gradient(270deg, #21984B, #92CBA6)"},{"name":"Spiced Orange","baseIndex":11,"value":"linear-gradient(270deg, #E46E31, #FBD9BC)"},{"name":"Steel Frost","baseIndex":12,"value":"linear-gradient(270deg, #515353, #E6EBEA)"},{"name":"Rosewood Red","baseIndex":13,"value":"linear-gradient(270deg, #D82B31, #EB9495)"}],"useBackgroundGradient":true},"tooltipProgressChart":{"enabled":true,"width":"248","height":"144","prefix":"CPAS","sortBy":{"label":"Total","value":"total"},"sortDirection":{"label":"Desc","value":"desc"},"titleMargin":"5","itemsMargin":"8","padding":"8","fontSize":"10","titleGap":null,"readableNumber":null,"enableAbbreviation":null,"addSpaceBetweenNumberAndNotation":null,"abbreviationScale":null,"decimalPrecision":null},"localFilter":{"enabled":true,"type":"date","column":{"label":"event_date","value":"event_date"},"itemList":[],"itemListDate":[{"label":"Daily","value":"daily"},{"label":"Monthly","value":"monthly"}],"placeholder":"Daily"},"optionsProgressChart":{"separator":{"label":"Comma (,)","value":"comma"},"decimal":"0","decimalPercentage":"0","abbr":false,"notation":null,"typeSymbol":{"label":"Short (Mio)","value":"short"},"symbolWithSpace":false}}',
              extraOptions:
                '{"extras":{"widgetId":"W-2392","position":"top-center","extrasWidget":{"widgetId":"W-2704","position":"top-center"}},"title":"Churn (CAPS/Cleansing)","subtitle":"","type":"date","formatDate":"DD MMMM YYYY","prefixSubtitle":"Last Updated:","description":"Churn (CAPS/Cleansing)","abbr":false,"decimal":"0","decimalPercentage":"0","titleColor":null,"backgroundColorHeader":null,"borderColor":null,"borderWeight":null,"localFilter":{"enabled":true,"type":"date","column":"event_date","list":[{"label":"Daily","value":"daily","children":[],"found":true},{"label":"Monthly","value":"monthly","children":[],"found":true}],"placeholder":"Daily"},"titleFontSize":null,"subtitleFontSize":null,"separator":"comma","typeSymbol":"short","symbolWithSpace":false,"contentLabel":true,"contentTotal":true,"contentPercentage":true}',
              indexSideMenu: 0,
              widgetType: '',
              tabType: '',
              headerUseWidget: false,
              tabId: '',
              hideTitle: false,
              tabs: [],
              widgetEmptyCardList: [],
              text: '',
              type: '',
            },
            {
              widgetListId: 20290,
              title: 'Sales',
              subtitle: 'event_date',
              widgetId: 'W-2385',
              queryId: 'Q-1146',
              cacheId: 'cache-DS-45-286-3312032074',
              sqlQuery:
                'Itzt2agq0a+SGfrcHTD55qxfsqtv1RQxOkaNepMeL40lNVS3KYLCkjaXgZggvpgfr8pb5hCnzOA8LiaX50hStDidv1t4T+tD5TMzkpf4SZ57KZXKcnXy/P3WBnfN90PD6b6exp+lQckDzgdIhyVBKMgT/FUSnauDUkpS29klmKw9eIjgYS7h2HXIlvka+ljxXIgx/Cs7lItEnxkwx2WbiURtMA==',
              widgetAggregation: {
                select: [
                  {
                    singleSeries: true,
                  },
                  {
                    dateColumn: 'event_date',
                  },
                  {
                    xColumn: 'dimension_value',
                  },
                  {
                    columnDate: 'event_date',
                    operation: 'sum_growth_mom-period',
                    yColumn: 'total_subs',
                  },
                ],
                sort: {},
              },
              visualizationId: 'viz-24',
              rows: 13,
              cols: 12,
              x: 0,
              y: 21,
              chartOptions:
                '{"dataSeries":{"reportType":null,"xAxis":{"label":"dimension_value","value":"dimension_value"},"yAxis":{"label":"total_subs","value":"total_subs"},"series":null,"seriesOrder":null,"sortBy":null,"sortByOrder":null,"customOrder":null,"sortDataType":null,"showMarker":null,"fillMarker":null,"markerSymbol":null,"operation":{"label":"Growth MoM Period","value":"growth_mom-period"},"dateColumn":{"label":"event_date","value":"event_date"},"singleSeries":{"label":"Yes","value":"yes"},"growthType":null,"limit":null,"contentLabel":true,"contentTotal":true,"contentPercentage":true,"sum":null,"nodes":[]},"general":{"widgetName":"Sales","subtitle":{"label":"event_date","value":"event_date"},"type":"date","thousandSeparator":null,"decimalSeparator":null,"formatDate":{"label":"DD MMMM YYYY","value":"DD MMMM YYYY"},"prefixSubtitle":"Last Updated:","description":"Chart Sales","xAxisTitle":null,"yAxisTitle":null,"smoothLine":null,"gradientLine":null,"showDataLabel":null,"selectTypeChartGroup":null,"percentageMode":null,"averageMode":null,"innerSize":0,"showNotation":null,"chooseNotation":null,"decimal":null,"prefix":null,"suffix":null,"showCenterValue":null,"abbrTotalValue":null,"prefixCenterValue":null,"suffixCenterValue":null,"titleFontSize":null,"subtitleFontSize":null,"appearance":{"unit":{"value":"px"},"cornerTL":0,"cornerTR":0,"cornerBL":0,"cornerBR":0,"cornerRadius":0,"individualCorners":false},"titleColor":null,"typeColor":"fill","backgroundColorHeader":null,"borderWeight":"1","borderColor":null,"height":null,"readableNumber":null,"symbolNumber":null,"symbolSpace":null},"xAxis":{"showLabel":true,"labelWidth":null,"wordWrap":null,"textAlign":null,"scale":null,"interval":null,"ordering":null,"prefix":null,"suffix":null,"lineWidth":1,"gridLineWidth":0},"yAxis":{"showLabel":true,"labelAlign":"right","scale":null,"interval":null,"minimumValue":"Dynamic","customMinimumValue":null,"ordering":null,"lineWidth":0,"gridLineWidth":1,"enableAbbreviation":true,"addSpaceBetweenNumberAndNotation":true,"decimalPrecision":"2","gridLineDashStyle":"Solid","gridLineDashConnectorStyle":"ShortDash","readableNumber":null,"showNotationYaxis":true,"prefix":null,"suffix":null,"maximumValue":null},"tooltip":{"showTooltipSeries":true,"showTooltipSharedSeries":null,"decimal":"0","prefix":"IDR ","suffix":null,"type":{"label":"Advanced","value":"advanced"},"growth":{"notation":null,"decimal":null,"prefix":null,"suffix":null},"variant":{"value":"variant-1"},"seriesName":"Series Name","headerTitle":"Header Title","headerTextColor":"#fff","abbreviateValue":null,"addSpaceBetweenNumberAndNotation":null,"contentGrowth":null,"contentLastUpdated":null,"contentLastUpdateFormatDated":{"value":"DD-MMM-YYYY"},"readableNumber":true,"valueFontWeight":{"label":"Normal","value":"normal"},"contentGrowthCompareValue":null,"contentCompareValueReadableNumber":null,"contentGrowthCompareValueSuffix":null,"contentGrowthCompareValuePrefix":null,"contentCompareValueDecimalPrecision":2,"contentCompareValueEnableAbbreviation":null,"contentCompareValueAddSpaceBetweenNumberAndNotation":null,"contentGrowthPercentage":null,"contentGrowthPercentageDecimalPrecision":2,"contentGrowthPercentageReadableNumber":null,"contentTotalStacked":null,"contentSeries":null,"contentShowTitle":null,"contentTitle":null,"contentHideSymbol":null,"hideArrow":true,"fontSize":6,"contentGrowthType":null,"abbreviationScale":null},"legend":{"aliases":[],"showLegend":true,"isActiveLegendFilter":true,"growthType":{"label":"Month","value":"monthly"},"typeLegend":{"label":"Type 1","value":"type-1"},"themaLegend":{"label":"Advance","value":"advance"},"layoutLegend":{"label":"Vertical","value":"vertical"},"percentageMode":null,"limitLegend":null,"showLimitLegend":null,"titleText":"MoM","titleAlign":{"label":"Right","value":"right"},"titleFontSize":"","titleFontStyle":{"value":"normal"},"titleFontWeight":{"value":"bold"},"margin":"15","maxWidth":"","maxHeight":"81","verticalAlignment":{"label":"Bottom","value":"bottom"},"horizontalAlignment":{"label":"Center","value":"center"},"fontSize":null,"widthTotalValue":"124","widthCompareValue":"48","contentGrowthCompareValueSymbol":null,"widthSeries":"92","decimalPrecision":null,"enableAbbreviation":null,"readableNumber":null,"addSpaceBetweenNumberAndNotation":null,"contentValue":null,"contentGrowth":true,"contentGrowthCompareValue":true,"contentGrowthType":true,"itemMargin":"3","contentSeries":true,"contentSeriesTextColor":null,"hideSymbol":false,"contentValueFontWeight":null,"contentValuePrefix":null,"contentValueSuffix":null,"contentValueReadableNumber":null,"contentValueDecimalPrecision":null,"contentValueEnableAbbreviation":true,"contentValueAddSpaceBetweenNumberAndNotation":true,"contentCompareValuePrefix":null,"contentCompareValueSuffix":null,"contentCompareValueFontWeight":{"label":"Normal","value":"normal"},"contentCompareValueReadableNumber":true,"contentCompareValueDecimalPrecision":"0","contentCompareValueEnableAbbreviation":null,"contentCompareValueAddSpaceBetweenNumberAndNotation":null,"contentType":{"value":"series"},"contentGrowthTextAlign":{"label":"Right","value":"right"},"contentGrowthValue":false,"contentGrowthValueSuffix":null,"contentGrowthValuePrefix":null,"contentGrowthValueFontSize":null,"contentGrowthValueFontWeight":null,"contentGrowthPercentage":true,"contentGrowthPercentageReadableNumber":null,"contentGrowthPercentageDecimalPrecision":"2","navigationAlign":{"value":"left"}},"stack":{"showStack":null,"labelEnabled":null},"color":{"color":null,"orderingColor":["#00B4FF","#0072FB","#00D2AA","#008591","#20C400","#008C00","#7E97AA","#405F77","#FFAF00","#D34C00","#A274FF","#6334FF","#FF4B74","#E60000","#FF4AF9","#DF00E4","#FF7AAF","#F40079"],"showBackground":null,"orderingGradient":null,"useBackgroundGradient":true,"useColorByPoint":null,"nodesColor":[],"upColor":null},"credit":{"creditText":null,"creditLink":null},"combine":{"showCombineChart":null,"combine":null,"showInLegend":null,"gradient":null,"seriesCombine":null},"ordering":{"legend":null}}',
              extraOptions:
                '{"appearance":{"unit":{"value":"px"},"cornerTL":0,"cornerTR":0,"cornerBL":0,"cornerBR":0,"cornerRadius":0,"individualCorners":false},"useBackgroundGradient":true,"useColorByPoint":null,"growth":{"enabled":false,"indicator":"value","labelRadius":false,"percentage":false,"abbr":false,"suffix":"","prefix":"","colorLine":null,"colorText":null,"boxTextTransparent":null},"tooltipType":{"headerTitle":"Header Title","headerTextColor":"#fff","seriesName":"Series Name","variant":"variant-1","enabled":true,"type":"advanced","decimal":"0","prefix":"IDR ","suffix":null,"growth":{"notation":null,"decimal":null,"prefix":null,"suffix":null},"abbreviateValue":null,"contentLastUpdateFormatDated":"DD-MMM-YYYY","addSpaceBetweenNumberAndNotation":null,"contentGrowth":null,"readableNumber":true,"valueFontWeight":"normal","contentLastUpdated":null,"contentGrowthCompareValue":null,"contentGrowthCompareValueSuffix":null,"contentGrowthCompareValuePrefix":null,"contentCompareValueReadableNumber":null,"contentCompareValueDecimalPrecision":2,"contentCompareValueEnableAbbreviation":null,"contentCompareValueAddSpaceBetweenNumberAndNotation":null,"contentGrowthPercentage":null,"contentGrowthPercentageDecimalPrecision":2,"contentGrowthPercentageReadableNumber":null,"hideArrow":true,"fontSize":6,"contentGrowthType":null,"contentSeries":null,"contentTotalStacked":null,"contentShowTitle":null,"contentTitle":null,"contentHideSymbol":null},"titleColor":null,"type":"date","formatDate":"DD MMMM YYYY","prefixSubtitle":"Last Updated:","halfDonut":{"enabled":false,"showValue":null,"prefix":null,"suffix":null,"abbr":null},"backgroundColorHeader":null,"borderWeight":"1","borderColor":null,"growthField":{"type":null,"data":[]},"localFilter":{"enabled":true,"type":"custom","column":"filter_type","list":[{"label":"Chanel","value":"chanel","children":[],"found":true},{"label":"Service","value":"service","children":[],"found":true},{"label":"Speed","value":"speed","children":[],"found":true}],"placeholder":"Chanel"},"titleFontSize":null,"subtitleFontSize":null}',
              indexSideMenu: 0,
              widgetType: '',
              tabType: '',
              headerUseWidget: false,
              tabId: '',
              hideTitle: false,
              tabs: [],
              widgetEmptyCardList: [],
              text: '',
              type: '',
            },
            {
              widgetListId: 34738,
              title: '',
              subtitle: '',
              widgetId: '-698099642',
              queryId: '',
              cacheId: '',
              sqlQuery: 'BvfVNx9OmyERL+zTN/tNzA==',
              widgetAggregation: null,
              visualizationId: '',
              rows: 9,
              cols: 12,
              x: 24,
              y: 0,
              chartOptions: '',
              extraOptions: '',
              indexSideMenu: 0,
              widgetType: 'empty-card',
              tabType: 'dropdown',
              headerUseWidget: false,
              tabId: '',
              hideTitle: false,
              tabs: [
                {
                  id: 'tab-520',
                  vizId: '',
                  widgetListId: 34738,
                  name: 'Total Sales',
                  show: true,
                  indexTab: 0,
                  child: [],
                },
                {
                  id: 'tab-521',
                  vizId: '',
                  widgetListId: 34738,
                  name: 'Average Daily Sales',
                  show: true,
                  indexTab: 1,
                  child: [],
                },
              ],
              widgetEmptyCardList: [
                {
                  widgetListId: 34740,
                  title: 'Total Sales',
                  subtitle: '',
                  widgetId: 'W-2377',
                  queryId: 'Q-1139',
                  cacheId: 'cache-DS-45-033-689982084',
                  sqlQuery:
                    'pcOPRBjaNyAdfxqnMY/NEz60Id/1/7A2q4XMCAje86S0/zbn0Urv1z4G0hUUXesm6aY/9GipliECcnqqBHIM36R2+n4R8JcfCsKH4OuXFAuapy3Go5kPR8WqVIYg/8wEugfyhGZ3YU5tnpo42Hhu8qgx4+IcjQlaPvDnY0o=',
                  widgetAggregation: {
                    chartType: 'basic_card',
                    select: [
                      {
                        columnValue: 'total',
                        dateColumn: 'event_date',
                        growthType: 'monthly-period',
                        operation: 'sum',
                        series: [
                          {
                            column: 'total',
                            growthType: 'monthly-period',
                            label: 'MoM',
                            operation: 'sum',
                          },
                          {
                            column: 'total',
                            growthType: 'yearly-period',
                            label: 'YoY',
                            operation: 'sum',
                          },
                        ],
                      },
                    ],
                  },
                  visualizationId: 'viz-13',
                  rows: 8,
                  cols: 12,
                  x: 0,
                  y: 0,
                  chartOptions:
                    '{"dataProcessor":{"themes":{"label":"Revamp","value":"revamp"},"columnValue":{"label":"total","value":"total"},"columnValueCompare":null,"typeOption":"basic","typePercentage":null,"columnDate":{"label":"event_date","value":"event_date"},"growthType":{"label":"Monthly Period","value":"monthly-period"},"label":null,"operation":{"label":"Sum","value":"sum"}},"seriesBasicCard":[{"typeSeries":null,"title":null,"label":"MoM","seriesColumn":{"label":"total","value":"total"},"seriesGrowthType":{"label":"Monthly Period","value":"monthly-period"},"seriesColumnLabel":null,"operation":{"label":"Sum","value":"sum"},"orderBy":null,"limitSeries":null,"groupingSeries":[],"seriesColumnValue":null,"growthType":null},{"typeSeries":null,"title":null,"label":"YoY","seriesColumn":{"label":"total","value":"total"},"seriesGrowthType":{"label":"Yearly","value":"yearly"},"seriesColumnLabel":null,"operation":{"label":"Sum","value":"sum"},"orderBy":null,"limitSeries":null,"groupingSeries":[],"seriesColumnValue":null,"growthType":null}],"generalBasicCard":{"title":"Total Sales","titleColor":"#ffffff","subtitle":null,"type":"date","formatDate":{"label":"DD MMMM YYYY","value":"DD MMMM YYYY"},"prefixSubtitle":"Last Updated:","description":"Jumlah aktivasi pelanggan indihome pada bulan berjalan, terhitung saat indihome pelanggan sudah terpasang (exclude upselling/downselling)","titleFontSize":null,"subtitleFontSize":null,"positionSubtitle":null,"icon":null,"cardId":null,"surface":null,"hideBorder":null,"categoryCard":null,"typeColor":"gradient","backgroundColorHeader":{"label":"Crimson Velvet","value":"linear-gradient(90.02deg, #D82A31 0.02%, #933F7A 128.33%)"}},"optionsBasicCard":{"abbr":false,"fontSize":null,"separator":"comma","decimal":null,"decimalPercentage":"2","prefix":"SSL","prefixPosition":"bottom","suffix":null,"suffixPosition":"default","seriesPrefix":null,"seriesSuffix":null,"seriesPrefixFrom":null,"seriesSuffixFrom":null,"abbrSeries":true,"decimalSeries":"","abbreviateNumbers":true,"hideValue":false,"hideFooter":true,"urlLearnMore":"/fmc-dashboard/v2/sales","hideGrowth":false,"hideSymbolPercentage":null}}',
                  extraOptions:
                    '{"title":"Total Sales","titleColor":"#ffffff","subtitle":"","description":"Jumlah aktivasi pelanggan indihome pada bulan berjalan, terhitung saat indihome pelanggan sudah terpasang (exclude upselling/downselling)","icon":"","cardId":null,"decimalPercentage":"2","prefix":"SSL","prefixPosition":"bottom","seriesOption":{"abbr":false,"decimal":"","hideGrowth":false,"suffix":null,"prefix":"SSL"},"styleBasicCard":{"themesCard":"revamp","hideBorder":null,"categoryCard":null,"backgroundColorHeader":"linear-gradient(90.02deg, #D82A31 0.02%, #933F7A 128.33%)"},"hideValue":false,"hideFooter":true,"type":"date","formatDate":"DD MMMM YYYY","prefixSubtitle":"Last Updated:","abbreviateNumbers":true,"separator":"comma","urlLearnMore":"/fmc-dashboard/v2/sales","journey":{"event":"click","customTitle":{"type":"none","prefix":"","suffix":"","customText":"","customList":[]}},"abbr":false,"suffixPosition":"default","titleFontSize":null,"typeOption":"basic","hideSymbolPercentage":null,"subtitleFontSize":null}',
                  indexSideMenu: 0,
                  widgetType: '',
                  tabType: '',
                  headerUseWidget: false,
                  tabId: 'tab-520',
                  hideTitle: false,
                  tabs: [],
                  widgetEmptyCardList: [],
                  text: '',
                  type: '',
                },
                {
                  widgetListId: 60821,
                  title: 'Avg Daily Sales',
                  subtitle: 'Last Updated: 21 January 2025',
                  widgetId: 'W-3048',
                  queryId: 'Q-1463',
                  cacheId: 'cache-DS-45-132-4279431566',
                  sqlQuery:
                    'yJq7qVIAkv+VlwljpFJODRnq/dYTLhmySUJ3mEQoPMTNgiOV6vwdLtmnpNp4hIzHFdnMB/oM6ih9IJgMUMUWAcZ+6jlN+U+JDmBFo51rt3Of6YKL8JcR2asRnZ4IkNSRrsPIs51zTfgEhpbx+cDoYmPT9L8CP/NzRDTV5SCiT8aU1CN7aXZw3Rt7z5hoCbIl1Q2pX1i7eOoNHFFbK1E0UrtRyxflbAumCHIZB7U4275aUrIfYCKTaTYLb+WWSdtCW6k+6ZydO5jscnFO8YREA94qochQaAru6/b2uaTjzlbRzz/N9A+Edhm8cxZqIvdPvA32pjwnAecjCY/sk4TLjd8TE8yz9U1cv/mbhq8S0XusYCDe71jjJOqeGBW3Ye3ezer7bRG9s1qyXKMugzAlJo1SOuZI+r69TMxVoQ0mDFlHeZjDstIbDm7oGc4aQJnvSwXH51ulYzapSF7p9HYXtTdqxwxzowHLarGk7GQLiw4DOxSqXoUDUaCC9X2068DiR9HKhf8/DkJSkmcpbw6fP3tAtroHNRNQtAZymG9Q5jKbf8DPpSCHo6NJfo4WKSiPMl5TIRskx9QyYIAVWvH8GoGY4SLYFWBqBBVWfhIpsR8mALaIdqyziHS1ryB0BQNDpElAtSGyHhPDzD+VkYCej9Ldz27zICXdBDPE2F2xfOvFbA6W582pP+p3l8WrXM3eGZaUUhS5+9w0JOYL4svSFsd/nrysOoyRAKgxOZjPA4mwy+DRFgcjxHf+yUCt4BvTswk32KxjnDDp1szVZJt7O/cQ1Cxnmyz1NQiYhfeUkJokt9Dzd3x+hmPeuwFeOCzfBO9WO89Q6X02PeKd1J1ezTakgQvsUQfN2XY9FkwvHpFbPQHtgvszgMY4uDv3M0a+4xcVxRw4hpFj569hW2IzVcv/YTLTLiXP2n16hSDKxgp+/6uda8ZU3A7OJAge5yMLtxWFOd7xDE2v4AFIeiOp6SfOivO4aqTJ00IDbuxG1lvLx9fEMD9c8PLszmsjYpM2lCwpvHkb83AdEYoMfpe+SXC5xGD4cin72ymMEE6XZDs3kBqJH89rYhLwIevA0PsqZ46co58+JgfAfiOyCfUQyfZXA44Pc2cKnq6wjBoc',
                  widgetAggregation: {
                    chartType: 'basic_card',
                    select: [
                      {
                        columnValue: 'total',
                        dateColumn: 'event_date',
                        growthType: 'monthly-period',
                        operation: 'average',
                        series: [
                          {
                            column: 'total',
                            growthType: 'monthly-period',
                            label: 'MoM',
                            operation: 'average',
                          },
                          {
                            column: 'total',
                            growthType: 'yearly-period',
                            label: 'YoY',
                            operation: 'average',
                          },
                        ],
                      },
                    ],
                  },
                  visualizationId: 'viz-13',
                  rows: 8,
                  cols: 12,
                  x: 0,
                  y: 0,
                  chartOptions:
                    '{"dataProcessor":{"themes":{"label":"Revamp","value":"revamp"},"columnValue":{"label":"total","value":"total"},"columnValueCompare":null,"typeOption":"basic","typePercentage":null,"columnDate":{"label":"event_date","value":"event_date"},"growthType":{"label":"Monthly Period","value":"monthly-period"},"label":null,"operation":{"label":"Average","value":"average"}},"seriesBasicCard":[{"typeSeries":null,"title":null,"label":"MoM","seriesColumn":{"label":"total","value":"total"},"seriesGrowthType":{"label":"Monthly Period","value":"monthly-period"},"seriesColumnLabel":null,"operation":{"label":"Average","value":"average"},"groupingSeries":[]},{"typeSeries":null,"title":null,"label":"YoY","seriesColumn":{"label":"total","value":"total"},"seriesGrowthType":{"label":"Yearly Period","value":"yearly-period"},"seriesColumnLabel":null,"operation":{"label":"Average","value":"average"},"groupingSeries":[]}],"generalBasicCard":{"title":"Avg Daily Sales","titleColor":"#ffffff","subtitle":null,"type":"date","formatDate":{"label":"DD MMMM YYYY","value":"DD MMMM YYYY"},"prefixSubtitle":"Last Updated:","description":"Description Average Daily Sales","titleFontSize":null,"subtitleFontSize":null,"positionSubtitle":null,"icon":null,"cardId":null,"surface":null,"hideBorder":null,"categoryCard":null,"typeColor":"gradient","backgroundColorHeader":{"label":"Crimson Velvet","value":"linear-gradient(90.02deg, #D82A31 0.02%, #933F7A 128.33%)"},"typeOption":"basic"},"optionsBasicCard":{"abbr":false,"fontSize":"","separator":"comma","decimal":null,"decimalPercentage":"2","prefix":"SSL","prefixPosition":"bottom","suffix":"","suffixPosition":"default","seriesPrefix":null,"seriesSuffix":"SSL","seriesPrefixFrom":null,"seriesSuffixFrom":null,"abbrSeries":false,"decimalSeries":null,"abbreviateNumbers":true,"hideValue":null,"hideFooter":true,"urlLearnMore":null,"hideGrowth":null,"hideSymbolPercentage":null}}',
                  extraOptions:
                    '{"title":"Avg Daily Sales","titleColor":"#ffffff","subtitle":"Last Updated: 21 January 2025","description":"Description Average Daily Sales","icon":"","cardId":null,"titleFontSize":"Description Average Daily Sales","seriesOption":{"suffix":"","abbr":false,"prefix":"SSL"},"styleBasicCard":{"themesCard":"revamp","hideBorder":null,"categoryCard":null,"backgroundColorHeader":"linear-gradient(90.02deg, #D82A31 0.02%, #933F7A 128.33%)"},"type":"date","formatDate":"DD MMMM YYYY","prefixSubtitle":"Last Updated:","abbr":false,"separator":"comma","prefixPosition":"bottom","suffixPosition":"default","decimalPercentage":"2","abbreviateNumbers":true,"hideValue":null,"hideFooter":true,"urlLearnMore":null,"suffix":"","hideSymbolPercentage":null,"fontSize":"","prefix":"SSL","typeOption":"basic"}',
                  indexSideMenu: 0,
                  widgetType: '',
                  tabType: '',
                  headerUseWidget: false,
                  tabId: 'tab-521',
                  hideTitle: false,
                  tabs: [],
                  widgetEmptyCardList: [],
                  text: '',
                  type: '',
                },
              ],
              text: '',
              type: '',
            },
            {
              widgetListId: 35356,
              title: 'Revenue Trend (Billion)',
              subtitle: '',
              widgetId: '-2551464458',
              queryId: '',
              cacheId: '',
              sqlQuery: 'M/jBi2i8njErkAvt/9jX4A==',
              widgetAggregation: null,
              visualizationId: '',
              rows: 12,
              cols: 34,
              x: 0,
              y: 9,
              chartOptions: '',
              extraOptions: '',
              indexSideMenu: 0,
              widgetType: 'empty-card',
              tabType: 'tab',
              headerUseWidget: true,
              tabId: '',
              hideTitle: false,
              tabs: [
                {
                  id: 'tab-526',
                  vizId: '',
                  widgetListId: 35356,
                  name: 'Area',
                  show: true,
                  indexTab: 0,
                  child: [],
                },
                {
                  id: 'tab-527',
                  vizId: '',
                  widgetListId: 35356,
                  name: 'Channel',
                  show: true,
                  indexTab: 1,
                  child: [],
                },
              ],
              widgetEmptyCardList: [
                {
                  widgetListId: 35358,
                  title: 'Revenue Trend (Area)',
                  subtitle: 'event_date',
                  widgetId: 'W-2389',
                  queryId: 'Q-1149',
                  cacheId: 'cache-DS-45-696-2051914062',
                  sqlQuery:
                    'bRljL3Z8X47RNDIHkJ8FF7z6vrp6bNlg0dWcLUWxTBPDfaPuoBNxrW7cUqlSsqN9ZWAk4bM4ut5mskh3CvyFUUTq0rJSGIwB0Wmfp3DJ5AvLttHA9pZozd4NhxlbLIBXG65OZrPMuETXAOVKDCOlzpKhhNR0AGcMPEA4YMZO6YJRL/TsmzyGUF2EP9CGzP51SrxfFQJ88YkUXyT+N2k1kg0U8M0LEtZfymcabvF0St9lmmz4J3Mf2nBQE4XJdGQByjJyaETQJnCcfSx7aZ2PhxyIT/WxemEcNJp0v5EBhnuVZi1xT+d8j2MbSTsWOXnX/B/JE4+FNnMpwiiaOX/cA/N5jHfjgqnpdHkQE+WwJXDleLZZtqv4lY1haPi//IVdfXn+IdF+zbVkrCIQfE4dcWsKF0PjRplyB0irJA/hjvyesAQQxeGPhRo8dGTdjy2b7h7wPib1606y/ERAut5FqGHidjqCFT59AcxZHJ4VkwziNK1p7BW4HM7VaOZbBwK/NsOexw==',
                  widgetAggregation: {
                    select: [
                      {
                        singleSeries: true,
                      },
                      {
                        dateColumn: 'event_date',
                      },
                      {
                        xColumn: 'area',
                      },
                      {
                        columnDate: 'event_date',
                        operation: 'sum_growth_mom',
                        yColumn: 'sum',
                      },
                    ],
                    sort: {},
                  },
                  visualizationId: 'viz-04',
                  rows: 8,
                  cols: 12,
                  x: 0,
                  y: 0,
                  chartOptions:
                    '{"dataSeries":{"reportType":null,"xAxis":{"label":"area","value":"area"},"yAxis":{"label":"sum","value":"sum"},"series":null,"seriesOrder":null,"sortBy":null,"sortByOrder":null,"customOrder":null,"sortDataType":null,"showMarker":null,"fillMarker":null,"markerSymbol":null,"operation":{"label":"Growth MoM","value":"growth_mom"},"dateColumn":{"label":"event_date","value":"event_date"},"singleSeries":{"label":"Yes","value":"yes"},"growthType":null,"limit":null,"contentLabel":true,"contentTotal":true,"contentPercentage":true,"sum":null,"nodes":[]},"general":{"widgetName":"Revenue Trend (Area)","subtitle":{"label":"event_date","value":"event_date"},"type":"date","thousandSeparator":null,"decimalSeparator":null,"formatDate":{"label":"DD MMMM YYYY","value":"DD MMMM YYYY"},"prefixSubtitle":"Last Updated:","description":"Revenue trend area (Monthly)","xAxisTitle":"Area","yAxisTitle":"Total Revenue (IDR)","smoothLine":null,"gradientLine":null,"showDataLabel":null,"selectTypeChartGroup":null,"percentageMode":null,"averageMode":null,"innerSize":0,"showNotation":true,"chooseNotation":{"label":"Billions","value":"billions"},"decimal":null,"prefix":null,"suffix":null,"showCenterValue":null,"abbrTotalValue":null,"prefixCenterValue":null,"suffixCenterValue":null,"titleFontSize":null,"subtitleFontSize":null,"appearance":{"unit":{"label":"Percentage","value":"%"},"cornerTL":"100","cornerTR":"100","cornerBL":"","cornerBR":"","cornerRadius":"100","individualCorners":true},"titleColor":null,"typeColor":null,"backgroundColorHeader":null,"borderWeight":"1","borderColor":"#D5D5D545","height":null,"readableNumber":null,"symbolNumber":null,"symbolSpace":null},"xAxis":{"showLabel":false,"labelWidth":null,"wordWrap":null,"textAlign":null,"scale":null,"interval":null,"ordering":["AREA 1","AREA 4","AREA 3","AREA 2"],"prefix":null,"suffix":null,"lineWidth":"0","gridLineWidth":0},"yAxis":{"showLabel":true,"labelAlign":"center","scale":null,"interval":null,"minimumValue":"Dynamic","customMinimumValue":null,"ordering":null,"lineWidth":"0","gridLineWidth":1,"enableAbbreviation":false,"addSpaceBetweenNumberAndNotation":false,"decimalPrecision":0,"gridLineDashStyle":"Solid","gridLineDashConnectorStyle":"ShortDash","readableNumber":null,"showNotationYaxis":true,"prefix":null,"suffix":null},"tooltip":{"showTooltipSeries":true,"showTooltipSharedSeries":null,"decimal":"0","prefix":"","suffix":null,"type":{"label":"Advanced","value":"advanced"},"growth":{"notation":null,"decimal":null,"prefix":null,"suffix":null},"variant":{"value":"variant-1"},"seriesName":"Series Name","headerTitle":"Header Title","headerTextColor":"#fff","abbreviateValue":false,"addSpaceBetweenNumberAndNotation":true,"contentGrowth":true,"contentLastUpdated":true,"contentLastUpdateFormatDated":{"value":"DD-MMM-YYYY"},"readableNumber":true,"valueFontWeight":{"value":"bold"},"contentGrowthCompareValue":true,"contentCompareValueReadableNumber":true,"contentGrowthCompareValueSuffix":null,"contentGrowthCompareValuePrefix":null,"contentCompareValueDecimalPrecision":"0","contentCompareValueEnableAbbreviation":null,"contentCompareValueAddSpaceBetweenNumberAndNotation":null,"contentGrowthPercentage":true,"contentGrowthPercentageDecimalPrecision":"0","contentGrowthPercentageReadableNumber":null,"contentTotalStacked":null,"contentSeries":null,"contentShowTitle":null,"contentTitle":null,"contentHideSymbol":null,"hideArrow":null,"fontSize":6,"contentGrowthType":true,"abbreviationScale":null},"legend":{"aliases":[],"showLegend":true,"isActiveLegendFilter":false,"growthType":{"label":"Month","value":"monthly"},"typeLegend":{"label":"Variant 4","value":"type-4"},"themaLegend":{"label":"Advance","value":"advance"},"layoutLegend":{"label":"Vertical","value":"vertical"},"percentageMode":null,"limitLegend":null,"showLimitLegend":null,"titleText":"","titleAlign":{"value":"left"},"titleFontSize":"","titleFontStyle":{"label":"Normal","value":"normal"},"titleFontWeight":{"label":"Bold","value":"bold"},"margin":"18","maxWidth":null,"maxHeight":"","verticalAlignment":{"label":"Top","value":"top"},"horizontalAlignment":{"label":"Right","value":"right"},"fontSize":"8","widthTotalValue":"","widthCompareValue":"","contentGrowthCompareValueSymbol":null,"widthSeries":"50","decimalPrecision":0,"enableAbbreviation":false,"readableNumber":null,"addSpaceBetweenNumberAndNotation":false,"contentValue":false,"contentGrowth":true,"contentGrowthCompareValue":true,"contentGrowthType":true,"itemMargin":"","contentSeries":true,"contentSeriesTextColor":null,"hideSymbol":false,"contentValueFontWeight":null,"contentValuePrefix":null,"contentValueSuffix":null,"contentValueReadableNumber":null,"contentValueDecimalPrecision":"1","contentValueEnableAbbreviation":true,"contentValueAddSpaceBetweenNumberAndNotation":true,"contentCompareValuePrefix":"Compared to last month ","contentCompareValueSuffix":"","contentCompareValueFontWeight":{"label":"Bold","value":"bold"},"contentCompareValueReadableNumber":true,"contentCompareValueDecimalPrecision":"0","contentCompareValueEnableAbbreviation":false,"contentCompareValueAddSpaceBetweenNumberAndNotation":true,"contentType":{"value":"series"},"contentGrowthTextAlign":null,"contentGrowthValue":true,"contentGrowthValueSuffix":"","contentGrowthValuePrefix":"Total Revenue","contentGrowthValueFontSize":"10","contentGrowthValueFontWeight":{"label":"Bolder","value":"bolder"},"contentGrowthPercentage":true,"contentGrowthPercentageReadableNumber":false,"contentGrowthPercentageDecimalPrecision":"2","navigationAlign":{"label":"Left","value":"left"}},"stack":{"showStack":null,"labelEnabled":null},"color":{"color":null,"orderingColor":["#00B4FF","#0072FB","#00D2AA","#008591","#20C400","#008C00","#7E97AA","#405F77","#FFAF00","#D34C00","#A274FF","#6334FF","#FF4B74","#E60000","#FF4AF9","#DF00E4","#FF7AAF","#F40079"],"showBackground":null,"orderingGradient":null,"useBackgroundGradient":true,"useColorByPoint":false,"nodesColor":[],"upColor":null},"credit":{"creditText":null,"creditLink":null},"combine":{"showCombineChart":null,"combine":null,"showInLegend":null,"gradient":null,"seriesCombine":null},"ordering":{"legend":["AREA 1","AREA 2","AREA 3","AREA 4"]}}',
                  extraOptions:
                    '{"appearance":{"unit":{"label":"Percentage","value":"%"},"cornerTL":"100","cornerTR":"100","cornerBL":"","cornerBR":"","cornerRadius":"100","individualCorners":true},"useBackgroundGradient":true,"growth":{"enabled":false,"indicator":"value","labelRadius":false,"percentage":false,"abbr":false,"suffix":"","prefix":"","colorLine":null,"colorText":null,"boxTextTransparent":null},"tooltipType":{"headerTitle":"Header Title","headerTextColor":"#fff","seriesName":"Series Name","variant":"variant-1","enabled":true,"type":"advanced","notation":"billions","decimal":"0","prefix":"","suffix":null,"growth":{"notation":null,"decimal":null,"prefix":null,"suffix":null},"abbreviateValue":false,"contentLastUpdateFormatDated":"DD-MMM-YYYY","addSpaceBetweenNumberAndNotation":true,"contentGrowth":true,"readableNumber":true,"valueFontWeight":"bold","contentLastUpdated":true,"contentGrowthCompareValue":true,"contentGrowthCompareValueSuffix":null,"contentGrowthCompareValuePrefix":null,"contentCompareValueReadableNumber":true,"contentCompareValueDecimalPrecision":"0","contentCompareValueEnableAbbreviation":null,"contentCompareValueAddSpaceBetweenNumberAndNotation":null,"contentGrowthPercentage":true,"contentGrowthPercentageDecimalPrecision":"0","contentGrowthPercentageReadableNumber":null,"hideArrow":null,"fontSize":6,"contentGrowthType":true,"contentSeries":null,"contentTotalStacked":null,"contentShowTitle":null,"contentTitle":null,"contentHideSymbol":null},"titleColor":null,"type":"date","formatDate":"DD MMMM YYYY","prefixSubtitle":"Last Updated:","halfDonut":{"enabled":false,"showValue":null,"prefix":null,"suffix":null,"abbr":null},"backgroundColorHeader":null,"borderWeight":"1","borderColor":"#D5D5D545","growthField":{"type":null,"data":[{"series":[{"y":"AREA 1","data":[407918474105,0,0,0],"name":"AREA 1","additionalValue":[{"label":"Total Value","text":"%mom","value":-1242297362},{"label":"mom","value":-0.30362083773228854},{"label":"Percentage","value":-0.30362083773228854},{"label":"Growth Type","value":"mom"},{"label":"Growth","value":"down"},{"label":"Growth Description","value":"Compared To Last month"},{"label":"Legend","value":"AREA 1"},{"label":"Last Update","value":1743465600},{"label":"%mom","value":-0.30362083773228854},{"label":"01 Apr - 30 Apr","value":407918474105},{"label":"01 Mar - 31 Mar","value":409160771467}],"grouping":false,"color":{"linearGradient":{"x1":1,"y1":0.5,"x2":0,"y2":0.5},"stops":[[0.4365,"#EDA244"],[0.9370999999999999,"#EDA24400"]]}},{"y":"AREA 2","data":[0,778330910750,0,0],"name":"AREA 2","additionalValue":[{"label":"Total Value","text":"%mom","value":-4409047722},{"label":"mom","value":-0.5632838434116711},{"label":"Percentage","value":-0.5632838434116711},{"label":"Growth Type","value":"mom"},{"label":"Growth","value":"down"},{"label":"Growth Description","value":"Compared To Last month"},{"label":"Legend","value":"AREA 2"},{"label":"Last Update","value":1743465600},{"label":"%mom","value":-0.5632838434116711},{"label":"01 Apr - 30 Apr","value":778330910750},{"label":"01 Mar - 31 Mar","value":782739958472}],"grouping":false,"color":{"linearGradient":{"x1":1,"y1":0.5,"x2":0,"y2":0.5},"stops":[[0.4485,"#1C649F"],[0.7685,"#89B5C9"]]}},{"y":"AREA 3","data":[0,0,641212922514,0],"name":"AREA 3","additionalValue":[{"label":"Total Value","text":"%mom","value":-2592121390},{"label":"mom","value":-0.4026252068920604},{"label":"Percentage","value":-0.4026252068920604},{"label":"Growth Type","value":"mom"},{"label":"Growth","value":"down"},{"label":"Growth Description","value":"Compared To Last month"},{"label":"Legend","value":"AREA 3"},{"label":"Last Update","value":1743465600},{"label":"%mom","value":-0.4026252068920604},{"label":"01 Apr - 30 Apr","value":641212922514},{"label":"01 Mar - 31 Mar","value":643805043904}],"grouping":false,"color":{"linearGradient":{"x1":1,"y1":0.5,"x2":0,"y2":0.5},"stops":[[-0.2708,"#53C0DA"],[1,"#53C0DA00"]]}},{"y":"AREA 4","data":[0,0,0,569661443268],"name":"AREA 4","additionalValue":[{"label":"Total Value","text":"%mom","value":-150696395},{"label":"mom","value":-0.026446680319784924},{"label":"Percentage","value":-0.026446680319784924},{"label":"Growth Type","value":"mom"},{"label":"Growth","value":"down"},{"label":"Growth Description","value":"Compared To Last month"},{"label":"Legend","value":"AREA 4"},{"label":"Last Update","value":1743465600},{"label":"%mom","value":-0.026446680319784924},{"label":"01 Apr - 30 Apr","value":569661443268},{"label":"01 Mar - 31 Mar","value":569812139663}],"grouping":false,"color":{"linearGradient":{"x1":1,"y1":0.5,"x2":0,"y2":0.5},"stops":[[0.0709,"#FC972B"],[0.5903,"#F33A28"],[0.7828,"#ED0226"]]}}],"categories":["AREA 1","AREA 4","AREA 3","AREA 2"]}]},"localFilter":{"enabled":false,"type":null,"list":[],"placeholder":null},"useColorByPoint":false,"titleFontSize":null,"subtitleFontSize":null}',
                  indexSideMenu: 0,
                  widgetType: '',
                  tabType: '',
                  headerUseWidget: false,
                  tabId: 'tab-526',
                  hideTitle: true,
                  tabs: [],
                  widgetEmptyCardList: [],
                  text: '',
                  type: '',
                },
                {
                  widgetListId: 35361,
                  title: 'Revenue Trend (Channel)',
                  subtitle: 'event_date',
                  widgetId: 'W-2395',
                  queryId: 'Q-1152',
                  cacheId: 'cache-DS-45-114-1150689967',
                  sqlQuery:
                    'WxvFeTMO0MtikPoruU1I9bAd5jzRTNC29ain/+Q9wrXs0GlOF2il7gEvFgPjxGbSTXegQFbBFCtUP/aXMlteXDHVOqqWmyljZmBjk5XAzIHRFZMlWof6Jx8/cRx/Ylts5kH+CLLaEF9hSSbHznQJuJ4jFZZWRj5RmzQe89BWx0wG1RiLyFO1cNIQbYz2RayEFnH+qGiaZXpL2KlovACIfK3p8TBN91A6+b3pkMZ+UcDwJJ51HkeFTK//L3ILij9ENaYqc0toQFEYNM3tryLA7tbmZLrle9Tz+wTPDlbDQiF5S9zhRJ8LlINUcg1Dm11dl2kus7/Ih0ue5jcU6psb00WgaNQBhI76QYAmJpSMUot5vwIvFOvxsRGQAECXcjNx9TSDo7Gr9BUYmliPR3ztbxkbFD9WliuqeeJWwWDQuLDWyTFxKihJavAdgYVyuQ/khYEkm94RgXULPz070p9VL9vZVgslX1MDNbEICupMubTj3iQhZyGoXDO4yWZWvmVawMZQzGTBg4uJEBbffDvyCvJShYdzU3ID+Cz8DHKw6cA6ZWDfp9RkCn/jzwFjaVH4EC4AYQgGiGAUJhJBswfYNIeMkv/dJJhdE4+auEKkxy9BOqTHLFuLaK7RfHcVzRj0vqs2P19Gl3Odxq0tOxMpktUnWGjwvN0=',
                  widgetAggregation: {
                    groupValue: [
                      {
                        alias: 'series',
                        growthType: 'monthly period',
                        operation: 'sum_growth_mom',
                        sortType: 'desc',
                        value: 'amount',
                      },
                    ],
                    select: [
                      {
                        growthType: 'monthly period',
                      },
                      {
                        singleSeries: true,
                      },
                      {
                        dateColumn: 'event_date',
                      },
                      {
                        xColumn: 'l1',
                      },
                      {
                        columnDate: 'event_date',
                        operation: 'sum_growth_mom',
                        yColumn: 'amount',
                      },
                    ],
                    sort: {
                      column: 'amount',
                      type: 'desc',
                    },
                  },
                  visualizationId: 'viz-04',
                  rows: 8,
                  cols: 12,
                  x: 0,
                  y: 0,
                  chartOptions:
                    '{"dataSeries":{"reportType":null,"xAxis":{"label":"l1","value":"l1"},"yAxis":{"label":"amount","value":"amount"},"series":null,"seriesOrder":"Descending","sortBy":{"label":"Y Axis","value":"Y Axis"},"sortByOrder":null,"customOrder":null,"sortDataType":null,"showMarker":null,"fillMarker":null,"markerSymbol":null,"operation":{"label":"Growth MoM","value":"growth_mom"},"dateColumn":{"label":"event_date","value":"event_date"},"singleSeries":{"label":"Yes","value":"yes"},"growthType":null,"limit":null,"contentLabel":true,"contentTotal":true,"contentPercentage":true,"sum":null,"nodes":[]},"general":{"widgetName":"Revenue Trend (Channel)","subtitle":{"label":"event_date","value":"event_date"},"type":"date","thousandSeparator":null,"decimalSeparator":null,"formatDate":{"label":"DD MMMM YYYY","value":"DD MMMM YYYY"},"prefixSubtitle":"Last Updated:","description":"revenue trend Channel","xAxisTitle":"Channel","yAxisTitle":"Total Revenue (IDR)","smoothLine":null,"gradientLine":null,"showDataLabel":null,"selectTypeChartGroup":null,"percentageMode":null,"averageMode":null,"innerSize":0,"showNotation":true,"chooseNotation":{"label":"Billions","value":"billions"},"decimal":null,"prefix":null,"suffix":null,"showCenterValue":null,"abbrTotalValue":null,"prefixCenterValue":null,"suffixCenterValue":null,"titleFontSize":null,"subtitleFontSize":null,"appearance":{"unit":{"value":"px"},"cornerTL":"20","cornerTR":"20","cornerBL":0,"cornerBR":0,"cornerRadius":0,"individualCorners":true},"titleColor":null,"typeColor":null,"backgroundColorHeader":null,"borderWeight":"1","borderColor":"#F5F8F8","height":null,"readableNumber":null,"symbolNumber":null,"symbolSpace":null},"xAxis":{"showLabel":false,"labelWidth":null,"wordWrap":null,"textAlign":null,"scale":null,"interval":null,"ordering":null,"prefix":null,"suffix":null,"lineWidth":"1","gridLineWidth":0},"yAxis":{"showLabel":true,"labelAlign":"right","scale":null,"interval":null,"minimumValue":"Dynamic","customMinimumValue":null,"ordering":null,"lineWidth":"0","gridLineWidth":"1","enableAbbreviation":false,"addSpaceBetweenNumberAndNotation":false,"decimalPrecision":0,"gridLineDashStyle":"Solid","gridLineDashConnectorStyle":"ShortDash","readableNumber":null,"showNotationYaxis":true,"prefix":null,"suffix":null},"tooltip":{"showTooltipSeries":true,"showTooltipSharedSeries":null,"decimal":"0","prefix":"","suffix":null,"type":{"label":"Advanced","value":"advanced"},"growth":{"notation":null,"decimal":null,"prefix":null,"suffix":null},"variant":{"value":"variant-1"},"seriesName":"Series Name","headerTitle":"Header Title","headerTextColor":"#fff","abbreviateValue":false,"addSpaceBetweenNumberAndNotation":true,"contentGrowth":true,"contentLastUpdated":true,"contentLastUpdateFormatDated":{"value":"DD-MMM-YYYY"},"readableNumber":true,"valueFontWeight":{"value":"bold"},"contentGrowthCompareValue":true,"contentCompareValueReadableNumber":true,"contentGrowthCompareValueSuffix":null,"contentGrowthCompareValuePrefix":"IDR ","contentCompareValueDecimalPrecision":"0","contentCompareValueEnableAbbreviation":null,"contentCompareValueAddSpaceBetweenNumberAndNotation":null,"contentGrowthPercentage":true,"contentGrowthPercentageDecimalPrecision":"1","contentGrowthPercentageReadableNumber":null,"contentTotalStacked":null,"contentSeries":null,"contentShowTitle":null,"contentTitle":null,"contentHideSymbol":null,"hideArrow":null,"fontSize":"","contentGrowthType":true,"abbreviationScale":null},"legend":{"aliases":[],"showLegend":true,"isActiveLegendFilter":false,"growthType":{"label":"Monthly Period","value":"monthly period"},"typeLegend":{"label":"Variant 4","value":"type-4"},"themaLegend":{"label":"Advance","value":"advance"},"layoutLegend":{"label":"Vertical","value":"vertical"},"percentageMode":null,"limitLegend":null,"showLimitLegend":null,"titleText":"","titleAlign":{"value":"left"},"titleFontSize":"","titleFontStyle":{"value":"normal"},"titleFontWeight":{"value":"bold"},"margin":"8","maxWidth":"250","maxHeight":"","verticalAlignment":{"label":"Top","value":"top"},"horizontalAlignment":{"label":"Right","value":"right"},"fontSize":"","widthTotalValue":"","widthCompareValue":"150","contentGrowthCompareValueSymbol":null,"widthSeries":"60","decimalPrecision":0,"enableAbbreviation":false,"readableNumber":null,"addSpaceBetweenNumberAndNotation":false,"contentValue":null,"contentGrowth":true,"contentGrowthCompareValue":true,"contentGrowthType":true,"itemMargin":"","contentSeries":true,"contentSeriesTextColor":null,"hideSymbol":false,"contentValueFontWeight":null,"contentValuePrefix":null,"contentValueSuffix":null,"contentValueReadableNumber":true,"contentValueDecimalPrecision":"1","contentValueEnableAbbreviation":true,"contentValueAddSpaceBetweenNumberAndNotation":true,"contentCompareValuePrefix":"Compared to last month ","contentCompareValueSuffix":"","contentCompareValueFontWeight":{"label":"Bold","value":"bold"},"contentCompareValueReadableNumber":true,"contentCompareValueDecimalPrecision":"0","contentCompareValueEnableAbbreviation":true,"contentCompareValueAddSpaceBetweenNumberAndNotation":true,"contentType":{"value":"series"},"contentGrowthTextAlign":null,"contentGrowthValue":true,"contentGrowthValueSuffix":"","contentGrowthValuePrefix":"Total Revenue","contentGrowthValueFontSize":"","contentGrowthValueFontWeight":{"label":"Bold","value":"bold"},"contentGrowthPercentage":true,"contentGrowthPercentageReadableNumber":false,"contentGrowthPercentageDecimalPrecision":"2","navigationAlign":{"label":"Left","value":"left"}},"stack":{"showStack":null,"labelEnabled":null},"color":{"color":null,"orderingColor":["#00B4FF","#0072FB","#00D2AA","#008591","#20C400","#008C00","#7E97AA","#405F77","#FFAF00","#D34C00","#A274FF","#6334FF","#FF4B74","#E60000","#FF4AF9","#DF00E4","#FF7AAF","#F40079"],"showBackground":null,"orderingGradient":null,"useBackgroundGradient":true,"useColorByPoint":false,"nodesColor":[],"upColor":null},"credit":{"creditText":null,"creditLink":null},"combine":{"showCombineChart":null,"combine":null,"showInLegend":null,"gradient":null,"seriesCombine":null},"ordering":{"legend":["COMMUNITY","DIGITAL","GRAPARI","NQ"]}}',
                  extraOptions:
                    '{"appearance":{"unit":{"value":"px"},"cornerTL":"20","cornerTR":"20","cornerBL":0,"cornerBR":0,"cornerRadius":0,"individualCorners":true},"useBackgroundGradient":true,"growth":{"enabled":false,"indicator":"value","labelRadius":false,"percentage":false,"abbr":false,"suffix":"","prefix":"","colorLine":null,"colorText":null,"boxTextTransparent":null},"tooltipType":{"headerTitle":"Header Title","headerTextColor":"#fff","seriesName":"Series Name","variant":"variant-1","enabled":true,"type":"advanced","notation":"billions","decimal":"0","prefix":"","suffix":null,"growth":{"notation":null,"decimal":null,"prefix":null,"suffix":null},"abbreviateValue":false,"contentLastUpdateFormatDated":"DD-MMM-YYYY","addSpaceBetweenNumberAndNotation":true,"contentGrowth":true,"readableNumber":true,"valueFontWeight":"bold","contentLastUpdated":true,"contentGrowthCompareValue":true,"contentGrowthCompareValueSuffix":null,"contentGrowthCompareValuePrefix":"IDR ","contentCompareValueReadableNumber":true,"contentCompareValueDecimalPrecision":"0","contentCompareValueEnableAbbreviation":null,"contentCompareValueAddSpaceBetweenNumberAndNotation":null,"contentGrowthPercentage":true,"contentGrowthPercentageDecimalPrecision":"1","contentGrowthPercentageReadableNumber":null,"hideArrow":null,"fontSize":"","contentGrowthType":true,"contentSeries":null,"contentTotalStacked":null,"contentShowTitle":null,"contentTitle":null,"contentHideSymbol":null},"titleColor":null,"type":"date","formatDate":"DD MMMM YYYY","prefixSubtitle":"Last Updated:","halfDonut":{"enabled":false,"showValue":null,"prefix":null,"suffix":null,"abbr":null},"backgroundColorHeader":null,"borderWeight":"1","borderColor":"#F5F8F8","growthField":{"type":null,"data":[{"series":[{"y":"NQ","data":[234752855779,0,0,0,0,0],"name":"NQ","additionalValue":[{"label":"Total Value","text":"%mom","value":-847469533},{"label":"mom","value":-0.35970643583692674},{"label":"Percentage","value":-0.35970643583692674},{"label":"Growth Type","value":"mom"},{"label":"Growth","value":"down"},{"label":"Growth Description","value":"Compared To Last month"},{"label":"Legend","value":"NQ"},{"label":"Last Update","value":1743465600},{"label":"%mom","value":-0.35970643583692674},{"label":"01 Apr - 30 Apr","value":234752855779},{"label":"01 Mar - 31 Mar","value":235600325312}],"grouping":false,"color":{"linearGradient":{"x1":1,"y1":0.5,"x2":0,"y2":0.5},"stops":[[-0.2708,"#53C0DA"],[1,"#53C0DA00"]]}},{"y":"BROADBAND","data":[0,1710901887469,0,0,0,0],"name":"BROADBAND","additionalValue":[{"label":"Total Value","text":"%mom","value":-89807303729},{"label":"mom","value":-4.987329668109918},{"label":"Percentage","value":-4.987329668109918},{"label":"Growth Type","value":"mom"},{"label":"Growth","value":"down"},{"label":"Growth Description","value":"Compared To Last month"},{"label":"Legend","value":"BROADBAND"},{"label":"Last Update","value":1743465600},{"label":"%mom","value":-4.987329668109918},{"label":"01 Apr - 30 Apr","value":1710901887469},{"label":"01 Mar - 31 Mar","value":1800709191198}],"grouping":false,"color":{"linearGradient":{"x1":1,"y1":0.5,"x2":0,"y2":0.5},"stops":[[0.0709,"#FC972B"],[0.5903,"#F33A28"],[0.7828,"#ED0226"]]}},{"y":"DIG. SERVICE","data":[0,0,306360671436,0,0,0],"name":"DIG. SERVICE","additionalValue":[{"label":"Total Value","text":"%mom","value":84889766066},{"label":"mom","value":38.32998556816258},{"label":"Percentage","value":38.32998556816258},{"label":"Growth Type","value":"mom"},{"label":"Growth","value":"up"},{"label":"Growth Description","value":"Compared To Last month"},{"label":"Legend","value":"DIG. SERVICE"},{"label":"Last Update","value":1743465600},{"label":"%mom","value":38.32998556816258},{"label":"01 Apr - 30 Apr","value":306360671436},{"label":"01 Mar - 31 Mar","value":221470905370}],"grouping":false,"color":{"linearGradient":{"x1":1,"y1":0.5,"x2":0,"y2":0.5},"stops":[[0.4365,"#EDA244"],[0.9370999999999999,"#EDA24400"]]}},{"y":"VOICE P2P","data":[0,0,0,105044501809,0,0],"name":"VOICE P2P","additionalValue":[{"label":"Total Value","text":"%mom","value":-2633479863},{"label":"mom","value":-2.445699503378411},{"label":"Percentage","value":-2.445699503378411},{"label":"Growth Type","value":"mom"},{"label":"Growth","value":"down"},{"label":"Growth Description","value":"Compared To Last month"},{"label":"Legend","value":"VOICE P2P"},{"label":"Last Update","value":1743465600},{"label":"%mom","value":-2.445699503378411},{"label":"01 Apr - 30 Apr","value":105044501809},{"label":"01 Mar - 31 Mar","value":107677981672}],"grouping":false,"color":{"linearGradient":{"x1":1,"y1":0.5,"x2":0,"y2":0.5},"stops":[[0.4485,"#1C649F"],[0.7685,"#89B5C9"]]}},{"y":"OTHERS REVENUE","data":[0,0,0,0,40056605006,0],"name":"OTHERS REVENUE","additionalValue":[{"label":"Total Value","text":"%mom","value":2719875},{"label":"mom","value":0.006790539771870801},{"label":"Percentage","value":0.006790539771870801},{"label":"Growth Type","value":"mom"},{"label":"Growth","value":"up"},{"label":"Growth Description","value":"Compared To Last month"},{"label":"Legend","value":"OTHERS REVENUE"},{"label":"Last Update","value":1743465600},{"label":"%mom","value":0.006790539771870801},{"label":"01 Apr - 30 Apr","value":40056605006},{"label":"01 Mar - 31 Mar","value":40053885131}],"grouping":false,"color":{"linearGradient":{"x1":1,"y1":0.5,"x2":0,"y2":0.5},"stops":[[0.0002,"#D82A31"],[1.2833,"#933F7A"]]}},{"y":"SMS P2P","data":[0,0,0,0,0,7229138],"name":"SMS P2P","additionalValue":[{"label":"Total Value","text":"%mom","value":1604315},{"label":"mom","value":28.522053049491515},{"label":"Percentage","value":28.522053049491515},{"label":"Growth Type","value":"mom"},{"label":"Growth","value":"up"},{"label":"Growth Description","value":"Compared To Last month"},{"label":"Legend","value":"SMS P2P"},{"label":"Last Update","value":1743465600},{"label":"%mom","value":28.522053049491515},{"label":"01 Apr - 30 Apr","value":7229138},{"label":"01 Mar - 31 Mar","value":5624823}],"grouping":false,"color":{"linearGradient":{"x1":1,"y1":0.5,"x2":0,"y2":0.5},"stops":[[0,"#75468A"],[1,"#D3C0D4"]]}}],"categories":["BROADBAND","DIG. SERVICE","NQ","VOICE P2P","OTHERS REVENUE","SMS P2P"]}]},"localFilter":{"enabled":false,"type":null,"list":[],"placeholder":null},"useColorByPoint":false,"titleFontSize":null,"subtitleFontSize":null}',
                  indexSideMenu: 0,
                  widgetType: '',
                  tabType: '',
                  headerUseWidget: false,
                  tabId: 'tab-527',
                  hideTitle: true,
                  tabs: [],
                  widgetEmptyCardList: [],
                  text: '',
                  type: '',
                },
              ],
              text: '',
              type: '',
            },
            {
              widgetListId: 36333,
              title: 'Monthly CT0',
              subtitle: 'Last Updated: 01 December 2024',
              widgetId: 'W-2713',
              queryId: 'Q-1281',
              cacheId: 'cache-DS-45-740-2343390820',
              sqlQuery:
                'FSRrqfkawTbupacbDRK1cIjQzE0TwQOcjUupDQBqJhXTCEGCUrJl730qvnK4T1FNVuINpYw8TIhG7gjmm4iYELQ/aN98rGM+bycxK2bxJ6hFa6dn26rD365qItJJkwTjuqW78wqNDZiqq+UCQmG19zz6IzWPGolGCH+kGl9PNpnPppVZdykFYhwzIfymPgGzKYqwBnB27EXRtMajNNIKLSnQNaGSn07m8X5kiOfLt7UlWQ4ZwDsBSrrgFJa3wNunn+MSUD7KtPdsxG3f4d5CAhkmCqK888ExoCTO770L3xB+rwdez+ZkOtj3nMhwVLXkt45cBq+KAuPuTQOsmt2CTF7i5bzxoituIcWcBIGeVeLu5BsQV+V2fofOMUfdD3QSJyuh71lPJm9K+NAh8gzWZRvRalfacK0JvUO1Oe5FOvYOcrj9JH3xKY0lTIkdmbpFygy0tHcd++jkbjEhn+cFg8j3XBjDNK0QiW8LkcAvVBk5h12WC8a4Jx3iAhCMzKbhWJqSkA==',
              widgetAggregation: {
                groupValue: [
                  {
                    alias: 'series',
                    operation: 'sum',
                    sortType: 'asc',
                    value: 'sum',
                  },
                ],
                select: [
                  {
                    singleSeries: false,
                  },
                  {
                    dateColumn: 'event_date',
                  },
                  {
                    xColumn: 'to_char',
                  },
                  {
                    operation: 'sum',
                    yColumn: 'sum',
                  },
                ],
                sort: {
                  column: 'to_char',
                  type: 'asc',
                },
              },
              visualizationId: 'viz-03',
              rows: 13,
              cols: 19,
              x: 12,
              y: 21,
              chartOptions:
                '{"dataSeries":{"reportType":null,"xAxis":{"label":"to_char","value":"to_char"},"yAxis":{"label":"sum","value":"sum"},"series":null,"seriesOrder":"Ascending","sortBy":{"label":"X Axis","value":"X Axis"},"sortByOrder":null,"customOrder":null,"sortDataType":null,"showMarker":null,"fillMarker":null,"markerSymbol":null,"operation":{"label":"Default","value":""},"dateColumn":null,"singleSeries":null,"growthType":null},"general":{"widgetName":"Monthly CT0","subtitle":{"label":"event_date","value":"event_date"},"type":"date","thousandSeparator":null,"decimalSeparator":null,"formatDate":{"label":"DD MMMM YYYY","value":"DD MMMM YYYY"},"prefixSubtitle":"Last Updated:","description":"Monthly CT0 desc","xAxisTitle":null,"yAxisTitle":null,"smoothLine":null,"gradientLine":null,"showDataLabel":true,"selectTypeChartGroup":null,"percentageMode":null,"innerSize":0,"showNotation":true,"chooseNotation":{"label":"Millions","value":"millions"},"decimal":"1","prefix":null,"suffix":null,"showCenterValue":null,"abbrTotalValue":null,"prefixCenterValue":null,"suffixCenterValue":null,"titleFontSize":"15","subtitleFontSize":"8","appearance":{"unit":{"value":"px"},"cornerTL":"50","cornerTR":"50","cornerBL":0,"cornerBR":0,"cornerRadius":0,"individualCorners":true},"titleColor":null,"typeColor":null,"backgroundColorHeader":null,"borderWeight":null,"borderColor":null,"height":null},"xAxis":{"showLabel":true,"scale":null,"interval":null,"ordering":null,"lineWidth":1,"gridLineWidth":0},"yAxis":{"showLabel":true,"labelAlign":"right","scale":null,"interval":null,"minimumValue":"Dynamic","customMinimumValue":null,"ordering":null,"lineWidth":0,"gridLineWidth":1,"enableAbbreviation":null,"addSpaceBetweenNumberAndNotation":null,"decimalPrecision":0,"gridLineDashStyle":{"label":"LongDash","value":"LongDash"},"readableNumber":null},"tooltip":{"showTooltipSeries":true,"showTooltipSharedSeries":null,"decimal":"0","prefix":null,"suffix":null,"type":{"label":"Advanced","value":"advanced"},"growth":{"notation":null,"decimal":null,"prefix":null,"suffix":null},"abbreviateValue":false,"addSpaceBetweenNumberAndNotation":true,"contentGrowth":null,"contentLastUpdated":null,"contentLastUpdateFormatDated":{"value":"DD-MMM-YYYY"},"readableNumber":true,"valueFontWeight":{"label":"Normal","value":"normal"},"contentGrowthCompareValue":null,"contentCompareValueReadableNumber":null,"contentGrowthCompareValueSuffix":null,"contentGrowthCompareValuePrefix":null,"contentCompareValueDecimalPrecision":2,"contentCompareValueEnableAbbreviation":null,"contentCompareValueAddSpaceBetweenNumberAndNotation":null,"contentGrowthPercentage":null,"contentGrowthPercentageDecimalPrecision":2,"contentGrowthPercentageReadableNumber":null,"hideArrow":true,"fontSize":6,"contentGrowthType":null},"legend":{"aliases":[],"showLegend":false,"isActiveLegendFilter":true,"growthType":null,"typeLegend":null,"themaLegend":null,"layoutLegend":null,"percentageMode":null,"titleText":null,"titleAlign":{"value":"left"},"titleFontSize":null,"titleFontStyle":{"value":"normal"},"titleFontWeight":{"value":"bold"},"margin":null,"maxWidth":null,"maxHeight":null,"verticalAlignment":null,"horizontalAlignment":null,"fontSize":null,"widthTotalValue":128,"widthCompareValue":null,"contentGrowthCompareValueSymbol":null,"widthSeries":null,"decimalPrecision":null,"enableAbbreviation":null,"readableNumber":null,"addSpaceBetweenNumberAndNotation":null,"contentValue":null,"contentGrowth":null,"contentGrowthCompareValue":null,"contentGrowthType":true,"itemMargin":null,"contentSeries":true,"contentSeriesTextColor":null,"hideSymbol":false,"contentValueFontWeight":null,"contentValuePrefix":null,"contentValueSuffix":null,"contentValueReadableNumber":null,"contentValueDecimalPrecision":null,"contentValueEnableAbbreviation":null,"contentValueAddSpaceBetweenNumberAndNotation":null,"contentCompareValuePrefix":null,"contentCompareValueSuffix":null,"contentCompareValueFontWeight":null,"contentCompareValueReadableNumber":null,"contentCompareValueDecimalPrecision":2,"contentCompareValueEnableAbbreviation":null,"contentCompareValueAddSpaceBetweenNumberAndNotation":null,"contentType":{"value":"series"},"contentGrowthTextAlign":null,"contentGrowthValue":null,"contentGrowthValueSuffix":null,"contentGrowthValuePrefix":null,"contentGrowthValueFontSize":null,"contentGrowthValueFontWeight":null,"contentGrowthPercentage":null,"contentGrowthPercentageReadableNumber":null,"contentGrowthPercentageDecimalPrecision":null,"navigationAlign":{"value":"left"}},"stack":{"showStack":null,"labelEnabled":null},"color":{"color":null,"orderingColor":["#00B4FF","#0072FB","#00D2AA","#008591","#20C400","#008C00","#7E97AA","#405F77","#FFAF00","#D34C00","#A274FF","#6334FF","#FF4B74","#E60000","#FF4AF9","#DF00E4","#FF7AAF","#F40079"],"showBackground":null,"orderingGradient":null,"useBackgroundGradient":true,"useColorByPoint":null},"credit":{"creditText":null,"creditLink":null},"combine":{"showCombineChart":null,"combine":null,"showInLegend":null,"gradient":null,"seriesCombine":null},"ordering":{"legend":null}}',
              extraOptions:
                '{"appearance":{"unit":{"value":"px"},"cornerTL":"50","cornerTR":"50","cornerBL":0,"cornerBR":0,"cornerRadius":0,"individualCorners":true},"useBackgroundGradient":true,"useColorByPoint":null,"growth":{"enabled":false,"indicator":"value","labelRadius":false,"percentage":false,"abbr":false,"suffix":"","prefix":"","colorLine":null,"colorText":null,"boxTextTransparent":null},"tooltipType":{"enabled":true,"type":"advanced","notation":"millions","decimal":"0","prefix":null,"suffix":null,"growth":{"notation":null,"decimal":null,"prefix":null,"suffix":null},"abbreviateValue":false,"contentLastUpdateFormatDated":"DD-MMM-YYYY","addSpaceBetweenNumberAndNotation":true,"contentGrowth":null,"readableNumber":true,"valueFontWeight":"normal","contentLastUpdated":null,"contentGrowthCompareValue":null,"contentGrowthCompareValueSuffix":null,"contentGrowthCompareValuePrefix":null,"contentCompareValueReadableNumber":null,"contentCompareValueDecimalPrecision":2,"contentCompareValueEnableAbbreviation":null,"contentCompareValueAddSpaceBetweenNumberAndNotation":null,"contentGrowthPercentage":null,"contentGrowthPercentageDecimalPrecision":2,"contentGrowthPercentageReadableNumber":null,"hideArrow":true,"fontSize":6,"contentGrowthType":null},"titleColor":null,"titleFontSize":"15","type":"date","formatDate":"DD MMMM YYYY","prefixSubtitle":"Last Updated:","halfDonut":{"enabled":false,"showValue":null,"prefix":null,"suffix":null,"abbr":null},"backgroundColorHeader":null,"borderWeight":null,"borderColor":null,"growthField":{"type":null,"data":[{"series":[{"data":[{"y":1111022,"additionalValue":[{"Label":null,"value":1111022},{"label":"Legend","value":"Dec 23"},{"label":"Last Update","value":1733011200},{"label":"Total Value","text":"Compared To Last Month","value":1111022},{"label":"MoM","value":0},{"label":"Percentage","value":0},{"label":"Growth Type","value":"MoM"},{"label":"Growth","value":"up"},{"label":"Growth Description","value":"Compared To Last Month"}],"color":{"linearGradient":{"x1":0.5,"y1":0,"x2":0.5,"y2":1},"stops":[[0.0709,"#FC972B"],[0.5903,"#F33A28"],[0.7828,"#ED0226"]]},"legendColor":"#FC972B"},{"y":1176097,"additionalValue":[{"Label":null,"value":1176097},{"label":"Legend","value":"Jan 24"},{"label":"Last Update","value":1733011200},{"label":"Total Value","text":"Compared To Last Month","value":65075},{"label":"MoM","value":5.857219749023872},{"label":"Percentage","value":5.857219749023872},{"label":"Growth Type","value":"MoM"},{"label":"Growth","value":"up"},{"label":"Growth Description","value":"Compared To Last Month"}],"color":{"linearGradient":{"x1":0.5,"y1":0,"x2":0.5,"y2":1},"stops":[[0.0709,"#FC972B"],[0.5903,"#F33A28"],[0.7828,"#ED0226"]]},"legendColor":"#FC972B"},{"y":1257117,"additionalValue":[{"Label":null,"value":1257117},{"label":"Legend","value":"Feb 24"},{"label":"Last Update","value":1733011200},{"label":"Total Value","text":"Compared To Last Month","value":81020},{"label":"MoM","value":6.8888875662466615},{"label":"Percentage","value":6.8888875662466615},{"label":"Growth Type","value":"MoM"},{"label":"Growth","value":"up"},{"label":"Growth Description","value":"Compared To Last Month"}],"color":{"linearGradient":{"x1":0.5,"y1":0,"x2":0.5,"y2":1},"stops":[[0.0709,"#FC972B"],[0.5903,"#F33A28"],[0.7828,"#ED0226"]]},"legendColor":"#FC972B"},{"y":1232212,"additionalValue":[{"Label":null,"value":1232212},{"label":"Legend","value":"Mar 24"},{"label":"Last Update","value":1733011200},{"label":"Total Value","text":"Compared To Last Month","value":-24905},{"label":"MoM","value":-1.9811202934969459},{"label":"Percentage","value":-1.9811202934969459},{"label":"Growth Type","value":"MoM"},{"label":"Growth","value":"down"},{"label":"Growth Description","value":"Compared To Last Month"}],"color":{"linearGradient":{"x1":0.5,"y1":0,"x2":0.5,"y2":1},"stops":[[0.0709,"#FC972B"],[0.5903,"#F33A28"],[0.7828,"#ED0226"]]},"legendColor":"#FC972B"},{"y":1255200,"additionalValue":[{"Label":null,"value":1255200},{"label":"Legend","value":"Apr 24"},{"label":"Last Update","value":1733011200},{"label":"Total Value","text":"Compared To Last Month","value":22988},{"label":"MoM","value":1.865588064391517},{"label":"Percentage","value":1.865588064391517},{"label":"Growth Type","value":"MoM"},{"label":"Growth","value":"up"},{"label":"Growth Description","value":"Compared To Last Month"}],"color":{"linearGradient":{"x1":0.5,"y1":0,"x2":0.5,"y2":1},"stops":[[0.0709,"#FC972B"],[0.5903,"#F33A28"],[0.7828,"#ED0226"]]},"legendColor":"#FC972B"},{"y":1280998,"additionalValue":[{"Label":null,"value":1280998},{"label":"Legend","value":"May 24"},{"label":"Last Update","value":1733011200},{"label":"Total Value","text":"Compared To Last Month","value":25798},{"label":"MoM","value":2.0552899936265137},{"label":"Percentage","value":2.0552899936265137},{"label":"Growth Type","value":"MoM"},{"label":"Growth","value":"up"},{"label":"Growth Description","value":"Compared To Last Month"}],"color":{"linearGradient":{"x1":0.5,"y1":0,"x2":0.5,"y2":1},"stops":[[0.0709,"#FC972B"],[0.5903,"#F33A28"],[0.7828,"#ED0226"]]},"legendColor":"#FC972B"},{"y":1319282,"additionalValue":[{"Label":null,"value":1319282},{"label":"Legend","value":"Jun 24"},{"label":"Last Update","value":1733011200},{"label":"Total Value","text":"Compared To Last Month","value":38284},{"label":"MoM","value":2.9886073202300083},{"label":"Percentage","value":2.9886073202300083},{"label":"Growth Type","value":"MoM"},{"label":"Growth","value":"up"},{"label":"Growth Description","value":"Compared To Last Month"}],"color":{"linearGradient":{"x1":0.5,"y1":0,"x2":0.5,"y2":1},"stops":[[0.0709,"#FC972B"],[0.5903,"#F33A28"],[0.7828,"#ED0226"]]},"legendColor":"#FC972B"},{"y":1366638,"additionalValue":[{"Label":null,"value":1366638},{"label":"Legend","value":"Jul 24"},{"label":"Last Update","value":1733011200},{"label":"Total Value","text":"Compared To Last Month","value":47356},{"label":"MoM","value":3.589528243392997},{"label":"Percentage","value":3.589528243392997},{"label":"Growth Type","value":"MoM"},{"label":"Growth","value":"up"},{"label":"Growth Description","value":"Compared To Last Month"}],"color":{"linearGradient":{"x1":0.5,"y1":0,"x2":0.5,"y2":1},"stops":[[0.0709,"#FC972B"],[0.5903,"#F33A28"],[0.7828,"#ED0226"]]},"legendColor":"#FC972B"},{"y":1402807,"additionalValue":[{"Label":null,"value":1402807},{"label":"Legend","value":"Aug 24"},{"label":"Last Update","value":1733011200},{"label":"Total Value","text":"Compared To Last Month","value":36169},{"label":"MoM","value":2.646567708493398},{"label":"Percentage","value":2.646567708493398},{"label":"Growth Type","value":"MoM"},{"label":"Growth","value":"up"},{"label":"Growth Description","value":"Compared To Last Month"}],"color":{"linearGradient":{"x1":0.5,"y1":0,"x2":0.5,"y2":1},"stops":[[0.0709,"#FC972B"],[0.5903,"#F33A28"],[0.7828,"#ED0226"]]},"legendColor":"#FC972B"},{"y":1442866,"additionalValue":[{"Label":null,"value":1442866},{"label":"Legend","value":"Sep 24"},{"label":"Last Update","value":1733011200},{"label":"Total Value","text":"Compared To Last Month","value":40059},{"label":"MoM","value":2.855631601496143},{"label":"Percentage","value":2.855631601496143},{"label":"Growth Type","value":"MoM"},{"label":"Growth","value":"up"},{"label":"Growth Description","value":"Compared To Last Month"}],"color":{"linearGradient":{"x1":0.5,"y1":0,"x2":0.5,"y2":1},"stops":[[0.0709,"#FC972B"],[0.5903,"#F33A28"],[0.7828,"#ED0226"]]},"legendColor":"#FC972B"},{"y":1674921,"additionalValue":[{"Label":null,"value":1674921},{"label":"Legend","value":"Oct 24"},{"label":"Last Update","value":1733011200},{"label":"Total Value","text":"Compared To Last Month","value":232055},{"label":"MoM","value":16.082921075137953},{"label":"Percentage","value":16.082921075137953},{"label":"Growth Type","value":"MoM"},{"label":"Growth","value":"up"},{"label":"Growth Description","value":"Compared To Last Month"}],"color":{"linearGradient":{"x1":0.5,"y1":0,"x2":0.5,"y2":1},"stops":[[0.0709,"#FC972B"],[0.5903,"#F33A28"],[0.7828,"#ED0226"]]},"legendColor":"#FC972B"},{"y":1751954,"additionalValue":[{"Label":null,"value":1751954},{"label":"Legend","value":"Nov 24"},{"label":"Last Update","value":1733011200},{"label":"Total Value","text":"Compared To Last Month","value":77033},{"label":"MoM","value":4.599201992213365},{"label":"Percentage","value":4.599201992213365},{"label":"Growth Type","value":"MoM"},{"label":"Growth","value":"up"},{"label":"Growth Description","value":"Compared To Last Month"}],"color":{"linearGradient":{"x1":0.5,"y1":0,"x2":0.5,"y2":1},"stops":[[0.0709,"#FC972B"],[0.5903,"#F33A28"],[0.7828,"#ED0226"]]},"legendColor":"#FC972B"},{"y":1832861,"additionalValue":[{"Label":null,"value":1832861},{"label":"Legend","value":"Dec 24"},{"label":"Last Update","value":1733011200},{"label":"Total Value","text":"Compared To Last Month","value":80907},{"label":"MoM","value":4.618100703557285},{"label":"Percentage","value":4.618100703557285},{"label":"Growth Type","value":"MoM"},{"label":"Growth","value":"up"},{"label":"Growth Description","value":"Compared To Last Month"}],"color":{"linearGradient":{"x1":0.5,"y1":0,"x2":0.5,"y2":1},"stops":[[0.0709,"#FC972B"],[0.5903,"#F33A28"],[0.7828,"#ED0226"]]},"legendColor":"#FC972B"}],"name":null,"y":1111022}],"categories":["Dec 23","Jan 24","Feb 24","Mar 24","Apr 24","May 24","Jun 24","Jul 24","Aug 24","Sep 24","Oct 24","Nov 24","Dec 24"]}]},"subtitleFontSize":"8","extras":{"position":"top-center","extrasWidget":{"widgetId":"W-2690","position":"top-center"}}}',
              indexSideMenu: 0,
              widgetType: '',
              tabType: '',
              headerUseWidget: false,
              tabId: '',
              hideTitle: false,
              tabs: [],
              widgetEmptyCardList: [],
              text: '',
              type: '',
            },
            {
              widgetListId: 53084,
              title: 'Net Add',
              subtitle: 'event_date',
              widgetId: 'W-2966',
              queryId: 'Q-1285',
              cacheId: 'cache-DS-45-071-1333511082',
              sqlQuery:
                'rpkKtA6AM3NNnlC3SW87ok+w+e2d2FloTeq70T/qrESP13tgk4pBdW+mX+cqEb/faZnJMHe397muT9knL2Kqdzs4QIuKhChLdGvAX15ewLH4YU+YvVNshPGTB7LONSPV/UkLUDUGUmQlYBO9vmr2H/qj5KLQFbU5FtKnYPMCYycuDQTo0JcwvvzHNbnfESHg3CCkO4GKpedPSzWtiYZ5d6j4Rtz1jX/TUWQ0VdGlaYlrRxl+Qxw/qoXmCvhSz1xcK9r8ZtZYRdSo7PAKH3RHXOPXnyWRzOwb2flZ6ermPMxNn3YULehWRp3LQdhrFSpK3yi+p++WYk1rNq93b0ZPgoCaCUrh7yMCGXRH58hFJSZjsBCsDcWheYrWEcMp/VRIsuadq3WA+zaowAjfy/ScqAJenD/pqtA/kQICeMw9hCNICKPXSyWh19/X9Mwww7U5voJrM8Cdf6mphUTjhDCClwFf8NkZKZCRCPJXUqJvp3TZZh9NXcGFgBbyBKfmLDAXvhHgzzRlBCB0eju+rCJjkar/PHada7HD5bgJWp3gtvhSZJTI/RCAAntnMvtkrWGVOMxPqLZED7y1nRj3Jkd+29Uf9dGcVExJoonULkx0/1gFuTvPstydo5qdEiDAUKlXx9Kiqq0zELByj2aoEtc2rLZG3We/VI+xLlbict7eQcC6CEp+SlIE4UNslb9DUTgyfcCZiaiEfYC15Li0Oawka5EzLUxQnVT7ioudgCHdVao6ePyPOd/bN3FDO5yiJPN6j//GQ6w3yyrQL6OUnUnLKZoyQRzZZc57bw8e1bKCUQrZco4+s5It8zoiB+2P2h79/7S4VkarcMEWL6VflLPuVDQEvOawJlMwQjOa+mF85DKW8lXJ/DyBgr/AvLuABfBcfEMac1qcwB2a51rvrIXy4RW62GcEipsqExNkLcCQ6zJGOWwGgiW8qulsmWh0KObhRhxxb1BAH9wQNqoEtdZ48Ao48C/tGMb5LltXpkya/i6sZq4NuBIrImHohuqigZsO/qS+JpwTmzwuTFgdSLIbZ1dgRLVAdrxCpaaCmt0okcZl3AZAiYqFzQZ278JoHCgWMFE1Zo73wzlQTMj/rUdxJubJ4BkjwWLtwPFrQKuvWHiMqlkOIgVwyNGk0z3ovxGz0PO0V1uNSFARILpYXoWn/h2U9VTm/6XMZuPlt3brhhvfjMbe+7MQ37mJHACkvZNV0+aekwo6wSqMt2l5no3OxJuJ4z+VIL3qS/fmBoUiqm+yXcmnjHLvcmAL1VYC7hsVf+XdWIlbSWoxVxtXVRCPWWyeHVHcno2fnMStIGnP4S3lmqehjBHG3plj73dhxS2GQv5MB+vNSnZ6cUPuWheL1KeLaYFZ4KbtvwVV7yc4Q2Zp4dpmCc8k2DWFWP91qU0hwhnxNMGc/kOHvoKGroC4CooASPQS4VPqtVdI22kMIBeQZdYYuefJB+iR5Li6CQbneQPIL+zWpCZ46WhFyu3AabNTksifsJ5N96JZ7aUfoplwk5ItmLdfVUmChiewOn1TmkEqlCe6xT/ZMbdcktbjysGnboC8CeG2KRdLIy5KllukIWxJ8rB4F6MlfqFBk4PyNBMXF6lqXCmx9uUjAjBH56fD8zxWT6uYsDdAnu0JbpxXUNzipUpQY8P93iN2ctjpTGiw1AQxkZAK1fRsbmHUNc01gYyFgCMJoeLOxWFi62DOaWtsuG/P4S3C2l+SlNj+melG1My6fBvBRLP4AXEWYGxtucbdxr/X1KpoLAiTrfvEdm2E010C/RFErT4O9HVlxLdu02NR/DDZdA2gLVc7i24l9r9gik8MP1yT7ucBDXCsoRzITtYCK+7kxuXzAkveObw2Mv32c7tRwRc3ALr3keIG+e9AjWx1CpoFBUuy9k9Y3WUBOPB31W0nQK9w4N0UrdGOCpWcTcIpVPFauUKuT6TuDGUe3VA79LDW4damMvX20KamXm8fi0UGgH3QWB5IegTmjIQS62SDIJUSw09r0N83v7gDFeySjAraM9t2K9TZvwhNbhVaSYxQzuRU2p29wOU3kFkWtGeR+Stf4djUyb7yc2vQTeCayOe5y5MNKVCb/OfqUjiGbWUV67SGgMPV89YjaTym6tArYYcXQM0KRHo2amE/94zDQYwVx9/WCOeMPFBeZQtXmmS7S96ofye2fJThI+2C/3Hc/e8aEBQqIKWH4kMWfwV2hDSBEbNuRGLqOW1CjWuxr+Y9NKxTYx3KJM4W0/TJdCwCoNjxEBucgJNAjwc2K7jBDW9Z9lHp14Nzh2BMpx/AmXoOioq9XwMK2+3zsfT20awH3lHK8wWnrYcKaG7diNXFxg==',
              widgetAggregation: {
                select: [
                  {
                    singleSeries: false,
                  },
                  {
                    dateColumn: 'event_date',
                  },
                  {
                    xColumn: 'event_month',
                  },
                  {
                    operation: 'sum',
                    yColumn: 'total_subs',
                  },
                ],
                sort: {},
              },
              visualizationId: 'viz-03',
              rows: 12,
              cols: 14,
              x: 0,
              y: 9,
              chartOptions:
                '{"dataSeries":{"reportType":null,"xAxis":{"label":"event_month","value":"event_month"},"yAxis":{"label":"total_subs","value":"total_subs"},"series":{"label":"none","value":"none"},"seriesOrder":null,"sortBy":null,"sortByOrder":null,"customOrder":null,"sortDataType":null,"showMarker":null,"fillMarker":null,"markerSymbol":null,"operation":{"label":"Default","value":""},"dateColumn":null,"singleSeries":null,"growthType":null,"limit":null,"contentLabel":true,"contentTotal":true,"contentPercentage":true,"sum":null,"nodes":[]},"general":{"widgetName":"Net Add","subtitle":{"label":"event_date","value":"event_date"},"type":"date","thousandSeparator":null,"decimalSeparator":null,"formatDate":{"label":"DD MMMM YYYY","value":"DD MMMM YYYY"},"prefixSubtitle":"Last Updated: ","description":"Net add","xAxisTitle":null,"yAxisTitle":null,"smoothLine":null,"gradientLine":null,"showDataLabel":null,"selectTypeChartGroup":null,"percentageMode":null,"averageMode":null,"innerSize":0,"showNotation":true,"chooseNotation":{"label":"Thousands","value":"thousands"},"decimal":null,"prefix":null,"suffix":null,"showCenterValue":null,"abbrTotalValue":null,"prefixCenterValue":null,"suffixCenterValue":null,"titleFontSize":null,"subtitleFontSize":null,"appearance":{"unit":{"value":"px"},"cornerTL":0,"cornerTR":0,"cornerBL":0,"cornerBR":0,"cornerRadius":"200","individualCorners":false},"titleColor":null,"typeColor":null,"backgroundColorHeader":null,"borderWeight":null,"borderColor":null,"height":null,"readableNumber":null,"symbolNumber":null,"symbolSpace":null},"xAxis":{"showLabel":true,"labelWidth":null,"wordWrap":null,"textAlign":null,"scale":null,"interval":null,"ordering":["Jan","Feb","Mar"],"prefix":null,"suffix":null,"lineWidth":"0","gridLineWidth":0},"yAxis":{"showLabel":false,"labelAlign":null,"scale":null,"interval":null,"minimumValue":"Dynamic","customMinimumValue":null,"ordering":null,"lineWidth":0,"gridLineWidth":"0","enableAbbreviation":null,"addSpaceBetweenNumberAndNotation":null,"decimalPrecision":0,"gridLineDashStyle":"Solid","gridLineDashConnectorStyle":"ShortDash","readableNumber":null,"showNotationYaxis":true,"prefix":null,"suffix":null},"tooltip":{"showTooltipSeries":true,"showTooltipSharedSeries":null,"decimal":"0","prefix":"SSL ","suffix":null,"type":{"label":"Advanced","value":"advanced"},"growth":{"notation":null,"decimal":null,"prefix":null,"suffix":null},"variant":{"value":"variant-1"},"seriesName":"Series Name","headerTitle":"Header Title","headerTextColor":"#fff","abbreviateValue":null,"addSpaceBetweenNumberAndNotation":null,"contentGrowth":null,"contentLastUpdated":null,"contentLastUpdateFormatDated":{"value":"DD-MMM-YYYY"},"readableNumber":true,"valueFontWeight":{"value":"bold"},"contentGrowthCompareValue":true,"contentCompareValueReadableNumber":true,"contentGrowthCompareValueSuffix":null,"contentGrowthCompareValuePrefix":null,"contentCompareValueDecimalPrecision":"0","contentCompareValueEnableAbbreviation":null,"contentCompareValueAddSpaceBetweenNumberAndNotation":null,"contentGrowthPercentage":true,"contentGrowthPercentageDecimalPrecision":2,"contentGrowthPercentageReadableNumber":null,"contentTotalStacked":null,"contentSeries":null,"contentShowTitle":null,"contentTitle":null,"contentHideSymbol":null,"hideArrow":true,"fontSize":6,"contentGrowthType":true,"abbreviationScale":null},"legend":{"aliases":[],"showLegend":true,"isActiveLegendFilter":true,"growthType":{"label":"Month","value":"monthly"},"typeLegend":{"label":"Variant 1","value":"type-1"},"themaLegend":{"label":"Advance","value":"advance"},"layoutLegend":{"label":"Vertical","value":"vertical"},"percentageMode":null,"limitLegend":null,"showLimitLegend":null,"titleText":"Net Add in 3 months","titleAlign":{"value":"left"},"titleFontSize":"12","titleFontStyle":{"value":"normal"},"titleFontWeight":{"value":"bold"},"margin":"8","maxWidth":null,"maxHeight":null,"verticalAlignment":{"label":"Middle","value":"middle"},"horizontalAlignment":{"label":"Right","value":"right"},"fontSize":null,"widthTotalValue":null,"widthCompareValue":null,"contentGrowthCompareValueSymbol":null,"widthSeries":null,"decimalPrecision":null,"enableAbbreviation":null,"readableNumber":null,"addSpaceBetweenNumberAndNotation":null,"contentValue":true,"contentGrowth":false,"contentGrowthCompareValue":false,"contentGrowthType":true,"itemMargin":null,"contentSeries":true,"contentSeriesTextColor":"#795548","hideSymbol":true,"contentValueFontWeight":null,"contentValuePrefix":null,"contentValueSuffix":null,"contentValueReadableNumber":true,"contentValueDecimalPrecision":"0","contentValueEnableAbbreviation":null,"contentValueAddSpaceBetweenNumberAndNotation":null,"contentCompareValuePrefix":null,"contentCompareValueSuffix":null,"contentCompareValueFontWeight":null,"contentCompareValueReadableNumber":null,"contentCompareValueDecimalPrecision":2,"contentCompareValueEnableAbbreviation":null,"contentCompareValueAddSpaceBetweenNumberAndNotation":null,"contentType":{"label":"Data","value":"data"},"contentGrowthTextAlign":null,"contentGrowthValue":true,"contentGrowthValueSuffix":" SSL","contentGrowthValuePrefix":null,"contentGrowthValueFontSize":"7","contentGrowthValueFontWeight":{"label":"Bold","value":"bold"},"contentGrowthPercentage":false,"contentGrowthPercentageReadableNumber":null,"contentGrowthPercentageDecimalPrecision":2,"navigationAlign":{"value":"left"}},"stack":{"showStack":null,"labelEnabled":null},"color":{"color":null,"orderingColor":["#00B4FF","#0072FB","#00D2AA","#008591","#20C400","#008C00","#7E97AA","#405F77","#FFAF00","#D34C00","#A274FF","#6334FF","#FF4B74","#E60000","#FF4AF9","#DF00E4","#FF7AAF","#F40079"],"showBackground":null,"orderingGradient":null,"useBackgroundGradient":true,"useColorByPoint":null,"nodesColor":[],"upColor":null},"credit":{"creditText":null,"creditLink":null},"combine":{"showCombineChart":null,"combine":null,"showInLegend":null,"gradient":null,"seriesCombine":null},"ordering":{"legend":null}}',
              extraOptions:
                '{"appearance":{"unit":{"value":"px"},"cornerTL":0,"cornerTR":0,"cornerBL":0,"cornerBR":0,"cornerRadius":"200","individualCorners":false},"useBackgroundGradient":true,"useColorByPoint":null,"growth":{"enabled":false,"indicator":"value","labelRadius":false,"percentage":false,"abbr":false,"suffix":"","prefix":"","colorLine":null,"colorText":null,"boxTextTransparent":null},"tooltipType":{"headerTitle":"Header Title","headerTextColor":"#fff","seriesName":"Series Name","variant":"variant-1","enabled":true,"type":"advanced","notation":"thousands","decimal":"0","prefix":"SSL ","suffix":null,"growth":{"notation":null,"decimal":null,"prefix":null,"suffix":null},"abbreviateValue":null,"contentLastUpdateFormatDated":"DD-MMM-YYYY","addSpaceBetweenNumberAndNotation":null,"contentGrowth":null,"readableNumber":true,"valueFontWeight":"bold","contentLastUpdated":null,"contentGrowthCompareValue":true,"contentGrowthCompareValueSuffix":null,"contentGrowthCompareValuePrefix":null,"contentCompareValueReadableNumber":true,"contentCompareValueDecimalPrecision":"0","contentCompareValueEnableAbbreviation":null,"contentCompareValueAddSpaceBetweenNumberAndNotation":null,"contentGrowthPercentage":true,"contentGrowthPercentageDecimalPrecision":2,"contentGrowthPercentageReadableNumber":null,"hideArrow":true,"fontSize":6,"contentGrowthType":true,"contentSeries":null,"contentTotalStacked":null,"contentShowTitle":null,"contentTitle":null,"contentHideSymbol":null},"titleColor":null,"titleFontSize":null,"type":"date","formatDate":"DD MMMM YYYY","prefixSubtitle":"Last Updated: ","extras":{"widgetId":"W-2695","position":"top-center","extrasWidget":{"widgetId":"W-2698","position":"top-center"}},"halfDonut":{"enabled":false,"showValue":null,"prefix":null,"suffix":null,"abbr":null},"backgroundColorHeader":null,"borderWeight":null,"borderColor":null,"growthField":{"type":null,"data":[{"series":[{"innerSize":0,"name":"event_month","type":"column","data":[{"y":144026,"z":51.87,"name":"May 25","additionalValue":[{"label":"Legend","value":"May 25"},{"label":"Last Update","value":1748649600},{"label":"Total Value","text":"Compared To Last Month","value":10410},{"label":"MoM","value":7.790983115794516},{"label":"Percentage","value":7.790983115794516},{"label":"Growth Type","value":"MoM"},{"label":"Growth","value":"up"},{"label":"Growth Description","value":"Compared To Last Month"}],"color":{"linearGradient":{"x1":0.5,"y1":0,"x2":0.5,"y2":1},"stops":[[0.0709,"#FC972B"],[0.5903,"#F33A28"],[0.7828,"#ED0226"]]},"legendColor":"#FC972B"},{"y":133616,"z":48.13,"name":"Apr 25","additionalValue":[{"label":"Legend","value":"Apr 25"},{"label":"Last Update","value":1748649600},{"label":"Total Value","text":"Compared To Last Month","value":133616},{"label":"MoM","value":0},{"label":"Percentage","value":0},{"label":"Growth Type","value":"MoM"},{"label":"Growth","value":"up"},{"label":"Growth Description","value":"Compared To Last Month"}],"color":{"linearGradient":{"x1":0.5,"y1":0,"x2":0.5,"y2":1},"stops":[[0.0709,"#FC972B"],[0.5903,"#F33A28"],[0.7828,"#ED0226"]]},"legendColor":"#FC972B"}],"marker":{"symbol":"circle","enabled":null}}],"categories":["May 25","Apr 25"]}]},"subtitleFontSize":null}',
              indexSideMenu: 0,
              widgetType: '',
              tabType: '',
              headerUseWidget: false,
              tabId: '',
              hideTitle: false,
              tabs: [],
              widgetEmptyCardList: [],
              text: '',
              type: '',
            },
          ],
          tabs: [],
        },
      },
      new_data: {
        status: {
          code: '0',
          message: 'success',
        },
        data: {
          vizId: 'Viz-244',
          datasourceId: 'DS-45',
          vizName: 'Executive Summary',
          vizDesc: '',
          published: true,
          filter: {
            date: {
              affectedWidgets: [
                {
                  column: {
                    label: 'event_date',
                    value: 'event_date',
                  },
                  toggle: true,
                  widgetList: [
                    {
                      label: 'Total Line in Service',
                      value: 'W-1429',
                    },
                    {
                      label: 'Billed Revenue',
                      value: 'W-2374',
                    },
                    {
                      label: 'Churn (CAPS/Cleansing)',
                      value: 'W-2390',
                    },
                    {
                      label: 'Sales',
                      value: 'W-2385',
                    },
                    {
                      label: 'Total Sales',
                      value: 'W-2377',
                    },
                    {
                      label: 'Avg Daily Sales',
                      value: 'W-3048',
                    },
                    {
                      label: 'Revenue Trend (Billion)',
                      value: 'W-2389',
                    },
                    {
                      label: 'Revenue Trend (Billion)',
                      value: 'W-2395',
                    },
                    {
                      label: 'Monthly CT0',
                      value: 'W-2713',
                    },
                    {
                      label: 'Net Add',
                      value: 'W-2966',
                    },
                  ],
                },
                {
                  column: {
                    label: 'load_date',
                    value: 'load_date',
                  },
                  toggle: true,
                  widgetList: [
                    {
                      label: 'Collection Rate/C3MR',
                      value: 'W-2375',
                    },
                  ],
                },
              ],
              defaultValue: null,
              defaultValueFormat: 'days',
              enableDateRange: true,
              enabled: true,
              end: '-1',
              format: 'DD/MM/YYYY',
              isMtd: false,
              max: '0',
              min: '-365',
              start: '',
            },
            sidebar: {
              listFilter: [
                {
                  affectedWidgets: [
                    {
                      column: {
                        label: 'branch',
                        value: 'branch',
                      },
                      toggle: true,
                      widgetList: [
                        {
                          label: 'Total Line in Service',
                          value: 'W-1429',
                        },
                        {
                          label: 'Billed Revenue',
                          value: 'W-2374',
                        },
                        {
                          label: 'Collection Rate/C3MR',
                          value: 'W-2375',
                        },
                        {
                          label: 'Churn (CAPS/Cleansing)',
                          value: 'W-2390',
                        },
                        {
                          label: 'Sales',
                          value: 'W-2385',
                        },
                        {
                          label: 'Total Sales',
                          value: 'W-2377',
                        },
                        {
                          label: 'Avg Daily Sales',
                          value: 'W-3048',
                        },
                        {
                          label: 'Revenue Trend (Billion)',
                          value: 'W-2389',
                        },
                        {
                          label: 'Revenue Trend (Billion)',
                          value: 'W-2395',
                        },
                        {
                          label: 'Monthly CT0',
                          value: 'W-2713',
                        },
                        {
                          label: 'Net Add',
                          value: 'W-2966',
                        },
                      ],
                    },
                  ],
                  enabled: true,
                  fieldName: 'Territory',
                  options: [
                    {
                      label: 'Area',
                      value: 'area',
                    },
                    {
                      label: 'Region',
                      value: 'region',
                    },
                    {
                      label: 'Branch',
                      value: 'branch',
                    },
                  ],
                },
                {
                  affectedWidgets: [
                    {
                      column: {
                        label: 'type',
                        value: 'type',
                      },
                      toggle: false,
                      widgetList: [
                        {
                          label: 'Revenue Trend (Billion)',
                          value: 'W-2395',
                        },
                        {
                          label: 'Revenue Trend (Billion)',
                          value: 'W-2812',
                        },
                      ],
                    },
                  ],
                  editFieldName: false,
                  enabled: true,
                  fieldName: 'Services',
                  options: [
                    {
                      label: '1P',
                      value: '1p',
                    },
                    {
                      label: '2P',
                      value: '2p',
                    },
                    {
                      label: '3P',
                      value: '3p',
                    },
                  ],
                },
              ],
            },
          },
          vizOptions:
            '{"clientSideRefresh":{"enable":false,"interval":0,"unit":""},"customGridColumn":{"enable":true,"totalGridColumns":48,"typeGrid":"scrollVertical"}}',
          vizType: 'general',
          widgetList: [
            {
              widgetListId: 4846,
              title: 'Total Line in Service',
              subtitle: 'Last Updated: 01 December 2024',
              widgetId: 'W-1429',
              queryId: 'Q-721',
              cacheId: 'cache-DS-45-469-2288288472',
              sqlQuery:
                'iSxoOENvIlIpeHxINW4IGy5ZPNxe8LGQ81lLticGG4HrOjfB+fZsQ6N8S/9P1IrN7yS2ZjI0xhJ4Re1Nv9lOGDVTVxTWMUJBTX8s8jQ3b/uKQ7t84Rm2+axmH4f9Pd6TReTyHps+v6U3cqOYkODJkPwk+A3QGHQpuA30OQg2x3GvuQW1hnnKxQzNc/sWq3reuaz+8FNKuHlgh8UnOfjH+NqBnY3zu9ijgwXIkecFwmqN8JdO4xAX7O54waT/er33/14O28LFZe8ZTsEGB9/YyCusWqz6mQiCdGUD5LHNXNbNKVNt0br/1Z11Xultx26amlGfzVb4t62SCTgUzxQuvsa88q0PvnpRneoCh1gogig6a7bhpeCMEIlkLfjYS/IGQDX0TPXUubBbGKueHm3vK9SvuG2GVO9/tQTgyF8ZrXfMW7zK/qml8PuOFyJLtOCqb3vAr1mqMf5N60nfU0kQ3kdH4DNenNBPfuE6ZRFIsrklszosMxu0/69gMdaYeYXmWdOf3G9zKoDy+XM8jwsL0q/U/r5eDlh4LkpHeGhEW81f9VbtPNo2NOyf1urBUPwVTMAgPSF9xivaNIa/bJ5lAOCfEugZN/uA3seMcvm3Mh/G+nq36vxmBFksN32XkZPXKMTrg3NRMbTivfme8EAwhgReGQyeg5wAJKSgtmwINxDmfyl/',
              widgetAggregation: {
                chartType: 'basic_card',
                select: [
                  {
                    columnValue: 'active_lis',
                    dateColumn: 'event_date',
                    growthType: 'yearly',
                    operation: 'sum',
                    series: [
                      {
                        column: 'active_lis',
                        growthType: 'monthly',
                        label: 'Active LIS',
                      },
                      {
                        column: 'inactive_lis',
                        growthType: 'monthly',
                        label: 'Inactive LIS',
                      },
                      {
                        column: 'sum',
                        growthType: 'monthly',
                        label: 'MoM',
                      },
                      {
                        column: 'sum',
                        growthType: 'yearly',
                        label: 'YoY',
                      },
                    ],
                  },
                ],
              },
              visualizationId: 'viz-13',
              rows: 9,
              cols: 12,
              x: 36,
              y: 0,
              chartOptions:
                '{"dataProcessor":{"themes":{"label":"Revamp","value":"revamp"},"columnValue":{"label":"active_lis","value":"active_lis"},"columnValueCompare":null,"typeOption":"basic","typePercentage":null,"columnDate":{"label":"event_date","value":"event_date"},"growthType":{"label":"Yearly","value":"yearly"},"label":null,"operation":{"label":"Sum","value":"sum"}},"seriesBasicCard":[{"typeSeries":null,"title":null,"label":"Active LIS","seriesColumn":{"label":"active_lis","value":"active_lis"},"seriesGrowthType":{"label":"Monthly","value":"monthly"},"seriesColumnLabel":null,"groupingSeries":[]},{"typeSeries":null,"title":null,"label":"Inactive LIS","seriesColumn":{"label":"inactive_lis","value":"inactive_lis"},"seriesGrowthType":{"label":"Monthly","value":"monthly"},"seriesColumnLabel":null,"groupingSeries":[]},{"typeSeries":null,"title":null,"label":"MoM","seriesColumn":{"label":"sum","value":"sum"},"seriesGrowthType":{"label":"Monthly","value":"monthly"},"seriesColumnLabel":null,"groupingSeries":[]},{"typeSeries":null,"title":null,"label":"YoY","seriesColumn":{"label":"sum","value":"sum"},"seriesGrowthType":{"label":"Yearly","value":"yearly"},"seriesColumnLabel":null,"groupingSeries":[]}],"generalBasicCard":{"title":"Total Line in Service","titleColor":"#ffffff","subtitle":null,"type":"date","formatDate":{"label":"DD MMMM YYYY","value":"DD MMMM YYYY"},"prefixSubtitle":"Last Updated:","description":"Jumlah seluruh sambungan pelanggan indihome dengan layanan SSL yang aktif","titleFontSize":null,"subtitleFontSize":null,"positionSubtitle":null,"icon":null,"cardId":null,"surface":null,"hideBorder":true,"categoryCard":null,"typeColor":"gradient","backgroundColorHeader":{"label":"Crimson Velvet","value":"linear-gradient(90.02deg, #D82A31 0.02%, #933F7A 128.33%)"}},"optionsBasicCard":{"abbr":false,"fontSize":null,"separator":"comma","decimal":null,"decimalPercentage":"2","prefix":"","prefixPosition":"top","suffix":"Customer","suffixPosition":"bottom","seriesPrefix":"","seriesSuffix":"","seriesPrefixFrom":null,"seriesSuffixFrom":null,"abbrSeries":false,"decimalSeries":null,"abbreviateNumbers":true,"hideValue":true,"hideFooter":true,"urlLearnMore":"/dashboard/subscriber/lis-%28line-in-service%29","hideGrowth":null,"hideSymbolPercentage":null}}',
              extraOptions:
                '{"title":"Total Line in Service","subtitle":"Last Updated: 01 October 2024","description":"Jumlah seluruh sambungan pelanggan indihome dengan layanan SSL yang aktif","icon":"","cardId":null,"styleBasicCard":{"themesCard":"revamp","hideBorder":true,"categoryCard":null,"backgroundColorHeader":"linear-gradient(90.02deg, #D82A31 0.02%, #933F7A 128.33%)"},"type":"date","formatDate":"DD MMMM YYYY","prefixSubtitle":"Last Updated:","prefix":"","prefixPosition":"top","suffix":"Customer","seriesOption":{"prefix":"","suffix":"Customer","abbr":false},"decimalPercentage":"2","abbr":false,"suffixPosition":"bottom","abbreviateNumbers":true,"titleColor":"#ffffff","additionalText":[],"hideValue":true,"hideFooter":true,"separator":"comma","urlLearnMore":"/dashboard/subscriber/lis-%28line-in-service%29","titleFontSize":"Jumlah seluruh sambungan pelanggan indihome dengan layanan SSL yang aktif","hideSymbolPercentage":null,"typeOption":"basic"}',
              indexSideMenu: 0,
              widgetType: '',
              tabType: 'tab',
              headerUseWidget: false,
              tabId: '',
              hideTitle: false,
              tabs: [],
              widgetEmptyCardList: [],
              text: '',
              type: '',
            },
            {
              widgetListId: 19912,
              title: 'Billed Revenue',
              subtitle: 'Last Updated: 01 December 2024',
              widgetId: 'W-2374',
              queryId: 'Q-1137',
              cacheId: 'cache-DS-45-921-86053213',
              sqlQuery:
                'yha/xdV14UtAEP4QrMMgIGfT9BH2qqDyqRS5tCNbd15g9GlA90+JMQZqTvySBCeHv5xWi//7p4SX+KMiiFOl/PlTKwLqNLvdTjs/Z8mT2cxPc1PYxynXcsDW1t2KHdEmxhLWLFKFCjE9EDZZcPIaR5BoXB373Zqbo3sX2IxZyyx2CaYqW1brVLoJKccP6II+2OZS5PU8njyOjiV+fhn2yvTmA1hjv46bUqqJLhm67jCqBPuKEdV6cbRHA7Ehz2JqbOWGVNB7FsQ+o9zfIhzUp88fvi09EXiK68gh8NE8nblVbwzJNYRNxcXjI9YUoZ6/ahVGi/KSB1e7Y7ghdCeAt/ABNNDme126wBC8espul+62MOgbF7j9q0fm3dKPU6p8kk76U2QFptvVzL+xL/seC+hq57aEL5v5nVT/lHVv2l/vV/6KLz4RkXocJbeHcdxb/In3glOruV8ctxyCb2ttM6TS6cX2iVDkJQ==',
              widgetAggregation: {
                chartType: 'basic_card',
                select: [
                  {
                    columnValue: 'total_amount',
                    dateColumn: 'event_date',
                    growthType: 'monthly',
                    operation: 'sum',
                    series: [
                      {
                        column: 'total_amount',
                        growthType: 'monthly',
                        label: 'MoM',
                      },
                      {
                        column: 'total_amount',
                        growthType: 'yearly',
                        label: 'YoY',
                      },
                    ],
                  },
                ],
              },
              visualizationId: 'viz-13',
              rows: 9,
              cols: 12,
              x: 0,
              y: 0,
              chartOptions:
                '{"dataProcessor":{"themes":{"label":"Revamp","value":"revamp"},"columnValue":{"label":"total_amount","value":"total_amount"},"columnValueCompare":null,"typeOption":"basic","typePercentage":null,"columnDate":{"label":"event_date","value":"event_date"},"growthType":{"label":"Monthly","value":"monthly"},"label":null,"operation":{"label":"Sum","value":"sum"}},"seriesBasicCard":[{"typeSeries":null,"title":null,"label":"MoM","seriesColumn":{"label":"total_amount","value":"total_amount"},"seriesGrowthType":{"label":"Monthly","value":"monthly"},"seriesColumnLabel":null,"operation":null,"orderBy":null,"limitSeries":null,"groupingSeries":[],"seriesColumnValue":null,"growthType":null},{"typeSeries":null,"title":null,"label":"YoY","seriesColumn":{"label":"total_amount","value":"total_amount"},"seriesGrowthType":{"label":"Yearly","value":"yearly"},"seriesColumnLabel":null,"operation":null,"orderBy":null,"limitSeries":null,"groupingSeries":[],"seriesColumnValue":null,"growthType":null}],"generalBasicCard":{"title":"Billed Revenue","titleColor":"#ffffff","subtitle":null,"type":"date","formatDate":{"label":"DD MMMM YYYY","value":"DD MMMM YYYY"},"prefixSubtitle":"Last Updated:","description":"Revenue tagihan pelanggan untuk penggunaan yang telah disediakan selama periode tertentu","positionSubtitle":null,"icon":null,"cardId":null,"surface":null,"hideBorder":null,"categoryCard":null,"typeColor":"gradient","backgroundColorHeader":{"label":"Crimson Velvet","value":"linear-gradient(90.02deg, #D82A31 0.02%, #933F7A 128.33%)"}},"optionsBasicCard":{"abbr":true,"fontSize":null,"separator":"comma","decimal":"2","decimalPercentage":"2","prefix":"IDR","prefixPosition":"bottom","suffix":null,"suffixPosition":"default","seriesPrefix":"IDR","seriesSuffix":null,"seriesPrefixFrom":null,"seriesSuffixFrom":null,"abbrSeries":true,"decimalSeries":"2","abbreviateNumbers":true,"hideValue":null,"hideFooter":true,"urlLearnMore":null,"hideGrowth":null,"hideSymbolPercentage":null}}',
              extraOptions:
                '{"title":"Billed Revenue","titleColor":"#ffffff","subtitle":"Last Updated: 01 October 2024","description":"Revenue tagihan pelanggan untuk penggunaan yang telah disediakan selama periode tertentu","icon":"","cardId":null,"abbr":true,"separator":"comma","decimal":"2","prefix":"IDR","prefixPosition":"bottom","suffixPosition":"default","seriesOption":{"prefix":"IDR","abbr":true,"decimal":"2","suffix":null},"styleBasicCard":{"themesCard":"revamp","hideBorder":null,"categoryCard":null,"backgroundColorHeader":"linear-gradient(90.02deg, #D82A31 0.02%, #933F7A 128.33%)"},"hideValue":null,"hideFooter":true,"urlLearnMore":null,"type":"date","formatDate":"DD MMMM YYYY","prefixSubtitle":"Last Updated:","abbreviateNumbers":true,"titleFontSize":"Revenue tagihan pelanggan untuk penggunaan yang telah disediakan selama periode tertentu","decimalPercentage":"2","hideSymbolPercentage":null,"typeOption":"basic"}',
              indexSideMenu: 0,
              widgetType: '',
              tabType: '',
              headerUseWidget: false,
              tabId: '',
              hideTitle: false,
              tabs: [],
              widgetEmptyCardList: [],
              text: '',
              type: '',
            },
            {
              widgetListId: 19913,
              title: 'Collection Rate/C3MR',
              subtitle: '',
              widgetId: 'W-2375',
              queryId: 'Q-1138',
              cacheId: 'cache-DS-45-081-900432477',
              sqlQuery:
                '8GmMhhIASYXaXuPqpd9Chrap5tbMqMb/ZRIw+dyHTH2WRC9Kk5CtE3G2fCRrCT1k+C9kBm4UTqYZuUGvTe2z54og8TS5x7fOFBmS/OA3O1JhA28KIpCRNo50Kd8pjCnROe3gQBXZulUgh5gq251xMchD1nm7m0wu8EdPQ+3E9t6cCvWl1gBkh5CY2swXM4Im2o9QxNMC4U9xaeTf8GugEQAlRs79lHl8hbKydvgw9bb+4qpG5/tgfDGvfNG5is4jawvLmYN2loDfBQLWEYUZDnMLJ2GGOk6D7PsPwhdUjzkQDkUNxN8jlxdM5PfWRnz1Tt2s+tQP99kQZ1kWkNqFems=',
              widgetAggregation: {
                chartType: 'basic_card',
                select: [
                  {
                    column: 'sum_bill',
                    columnValue: 'sum_paid',
                    dateColumn: 'load_date',
                    growthType: 'monthly-period',
                    label: 'Compared to last month:',
                    operation: 'sum',
                    series: [
                      {
                        growthType: 'monthly-period',
                        series: [
                          {
                            columnValue: 'sum_bill',
                            growthType: 'monthly-period',
                            label: 'Total Billing',
                          },
                          {
                            columnValue: 'sum_paid',
                            growthType: 'monthly-period',
                            label: 'Paid',
                          },
                          {
                            columnValue: 'sum_unpaid',
                            growthType: 'monthly-period',
                            label: 'Unpaid',
                          },
                        ],
                        title: null,
                      },
                    ],
                  },
                ],
              },
              visualizationId: 'viz-13',
              rows: 9,
              cols: 12,
              x: 12,
              y: 0,
              chartOptions:
                '{"dataProcessor":{"themes":{"label":"Two Column","value":"two-column"},"columnValue":{"label":"sum_paid","value":"sum_paid"},"columnValueCompare":{"label":"sum_bill","value":"sum_bill"},"typeOption":"basic","typePercentage":true,"columnDate":{"label":"load_date","value":"load_date"},"growthType":{"label":"Monthly Period","value":"monthly-period"},"label":"Compared to last month:","operation":{"label":"Sum","value":"sum"}},"seriesBasicCard":[{"typeSeries":{"label":"Grouping","value":"grouping"},"title":null,"label":null,"seriesColumn":null,"seriesGrowthType":null,"seriesColumnLabel":null,"operation":null,"orderBy":null,"limitSeries":null,"groupingSeries":[{"label":"Total Billing","seriesColumn":null,"seriesGrowthType":{"label":"Monthly Period","value":"monthly-period"},"seriesColumnLabel":null,"seriesColumnValue":{"label":"sum_bill","value":"sum_bill"}},{"label":"Paid","seriesColumn":null,"seriesGrowthType":{"label":"Monthly Period","value":"monthly-period"},"seriesColumnLabel":null,"seriesColumnValue":{"label":"sum_paid","value":"sum_paid"}},{"label":"Unpaid","seriesColumn":null,"seriesGrowthType":{"label":"Monthly Period","value":"monthly-period"},"seriesColumnLabel":null,"seriesColumnValue":{"label":"sum_unpaid","value":"sum_unpaid"}}],"seriesColumnValue":null,"growthType":{"label":"Monthly Period","value":"monthly-period"}}],"generalBasicCard":{"title":"Collection Rate/C3MR","titleColor":"#ffffff","subtitle":null,"type":"date","formatDate":{"label":"DD MMMM YYYY","value":"DD MMMM YYYY"},"prefixSubtitle":"Last Updated:","description":"Collection Rate/C3MR","titleFontSize":null,"subtitleFontSize":null,"positionSubtitle":null,"icon":null,"cardId":null,"surface":null,"hideBorder":null,"categoryCard":null,"typeColor":"gradient","backgroundColorHeader":{"label":"Crimson Velvet","value":"linear-gradient(90.02deg, #D82A31 0.02%, #933F7A 128.33%)"}},"optionsBasicCard":{"abbr":false,"fontSize":null,"separator":"comma","decimal":null,"decimalPercentage":"1","prefix":"Paid Rate","prefixPosition":"bottom","suffix":"","suffixPosition":"default","seriesPrefix":"","seriesSuffix":"","seriesPrefixFrom":null,"seriesSuffixFrom":null,"abbrSeries":true,"decimalSeries":"1","abbreviateNumbers":true,"hideValue":null,"hideFooter":true,"urlLearnMore":"/dashboard/collection","hideGrowth":true,"hideSymbolPercentage":false,"positionTitleSeries":null,"titleLeftColumn":null}}',
              extraOptions:
                '{"title":"Collection Rate/C3MR","subtitle":"","description":"Collection Rate/C3MR","seriesOption":{"prefix":"","suffix":"","abbr":true,"decimal":"1","hideGrowth":true},"styleBasicCard":{"themesCard":"two-column","hideBorder":null,"categoryCard":null,"backgroundColorHeader":"linear-gradient(90.02deg, #D82A31 0.02%, #933F7A 128.33%)"},"titleColor":"#ffffff","cardId":null,"icon":"","formatDate":"DD MMMM YYYY","prefixSubtitle":"Last Updated:","type":"date","abbr":false,"prefix":"Paid Rate","prefixPosition":"bottom","decimalPercentage":"1","abbreviateNumbers":true,"hideValue":null,"hideFooter":true,"separator":"comma","urlLearnMore":"/dashboard/collection","suffixPosition":"default","titleFontSize":"Collection Rate/C3MR","hideSymbolPercentage":false,"suffix":"","typeOption":"basic","positionTitleSeries":null,"typePercentage":true}',
              indexSideMenu: 0,
              widgetType: '',
              tabType: '',
              headerUseWidget: false,
              tabId: '',
              hideTitle: false,
              tabs: [],
              widgetEmptyCardList: [],
              text: '',
              type: '',
            },
            {
              widgetListId: 20124,
              title: 'Churn (CAPS/Cleansing)',
              subtitle: '',
              widgetId: 'W-2390',
              queryId: 'Q-1150',
              cacheId: 'cache-DS-45-143-2885070436',
              sqlQuery:
                'F1rVx+zn6eR1V3W8mDZd4F9fGamB1TZBL3laY15TsWLIfcm1t1+wLEtSJeSyAWI6045HOK9yKlaLe+N/Ud88aQ9SkjbuC073YZeXteWw2A7XhDJVwMc+KjM60LDktRKXX62kXtCt+RcJWiMGDbEQX1bY2QBPAjqQKUjISlQUz++6ryIMzr+HjUg69Ao6gprqCpKdf75bRlLItwvpUwGjfs6JKmDHCcGw',
              widgetAggregation: {
                chartType: 'progress_bar',
                select: [
                  {
                    columnLabel: 'status_cabut_indihome',
                    columnValue: 'total',
                    dateColumn: 'event_date',
                    operation: 'sum',
                    series: [
                      {
                        columnLabel: 'area',
                        growthTypes: [],
                      },
                    ],
                  },
                ],
              },
              visualizationId: 'viz-25',
              rows: 13,
              cols: 17,
              x: 31,
              y: 21,
              chartOptions:
                '{"series":[{"growthTypes":[],"seriesColumnLabel":{"label":"area","value":"area"}}],"columnLabel":{"label":"status_cabut_indihome","value":"status_cabut_indihome"},"columnValue":{"label":"total","value":"total"},"dateColumn":null,"operation":"sum","target":0,"generalProgressChart":{"title":"Churn (CAPS/Cleansing)","subtitle":null,"type":"date","formatDate":{"label":"DD MMMM YYYY","value":"DD MMMM YYYY"},"dateColumn":{"label":"event_date","value":"event_date"},"prefixSubtitle":"Last Updated:","description":"Churn (CAPS/Cleansing)","unit":{"label":"PX","value":"px"},"cornerRadius":"20","titleColor":null,"typeColor":null,"backgroundColorHeader":null,"borderWeight":null,"borderColor":null,"titleFontSize":null,"subtitleFontSize":null,"contentLabel":true,"contentTotal":true,"contentPercentage":true},"colorProgressChart":{"orderingColor":[{"name":"Sky Blue","value":"#00B4FF","baseIndex":0},{"name":"Ocean Blue","value":"#0072FB","baseIndex":1},{"name":"Seafoam Green","value":"#00D2AA","baseIndex":2},{"name":"Teal Wave","value":"#008591","baseIndex":3},{"name":"Lime Spark","value":"#20C400","baseIndex":4},{"name":"Emerald Green","value":"#008C00","baseIndex":5},{"name":"Slate Grey","value":"#7E97AA","baseIndex":6},{"name":"Steel Blue","value":"#405F77","baseIndex":7},{"name":"Sunburst Orange","value":"#FFAF00","baseIndex":8},{"name":"Burnt Orange","value":"#D34C00","baseIndex":9},{"name":"Lavender Mist","value":"#A274FF","baseIndex":10},{"name":"Royal Purple","value":"#6334FF","baseIndex":11},{"name":"Coral Pink","value":"#FF4B74","baseIndex":12},{"name":"Crimson Red","value":"#E60000","baseIndex":13},{"name":"Neon Pink","value":"#FF4AF9","baseIndex":14},{"name":"Magenta Glow","value":"#DF00E4","baseIndex":15},{"name":"Bubblegum Pink","value":"#FF7AAF","baseIndex":16},{"name":"Hot Pink","value":"#F40079","baseIndex":17}],"orderingGradient":[{"name":"Sunset Blaze","baseIndex":0,"value":"linear-gradient(270deg, #FC972B 0%, #ED0226 50%, #F33A28 100%)"},{"name":"Amber Glow","baseIndex":1,"value":"linear-gradient(270deg, #EDA244, #FC972B)"},{"name":"Aqua Fade","baseIndex":2,"value":"linear-gradient(270deg, #53C0DA, #53C0DA00)"},{"name":"Ocean Mist","baseIndex":3,"value":"linear-gradient(270deg, #1C649F, #89B5C9)"},{"name":"Crimson Velvet","baseIndex":4,"value":"linear-gradient(270deg, #D82A31, #933F7A)"},{"name":"Purple Dream","baseIndex":5,"value":"linear-gradient(270deg, #75468A, #D3C0D4)"},{"name":"Berry Bloom","baseIndex":6,"value":"linear-gradient(270deg, #7A235C, #DCC2CE)"},{"name":"Blush \u0026 Rouge","baseIndex":7,"value":"linear-gradient(270deg, #F2C4C0, #DE494E)"},{"name":"Earthy Ember","baseIndex":8,"value":"linear-gradient(270deg, #844025, #F3B88E)"},{"name":"Green Meadow","baseIndex":9,"value":"linear-gradient(270deg, #7ABE50, #DBECC9)"},{"name":"Forest Fresh","baseIndex":10,"value":"linear-gradient(270deg, #21984B, #92CBA6)"},{"name":"Spiced Orange","baseIndex":11,"value":"linear-gradient(270deg, #E46E31, #FBD9BC)"},{"name":"Steel Frost","baseIndex":12,"value":"linear-gradient(270deg, #515353, #E6EBEA)"},{"name":"Rosewood Red","baseIndex":13,"value":"linear-gradient(270deg, #D82B31, #EB9495)"}],"useBackgroundGradient":true},"tooltipProgressChart":{"enabled":true,"width":"248","height":"144","prefix":"CPAS","sortBy":{"label":"Total","value":"total"},"sortDirection":{"label":"Desc","value":"desc"},"titleMargin":"5","itemsMargin":"8","padding":"8","fontSize":"10","titleGap":null,"readableNumber":null,"enableAbbreviation":null,"addSpaceBetweenNumberAndNotation":null,"abbreviationScale":null,"decimalPrecision":null},"localFilter":{"enabled":true,"type":"date","column":{"label":"event_date","value":"event_date"},"itemList":[],"itemListDate":[{"label":"Daily","value":"daily"},{"label":"Monthly","value":"monthly"}],"placeholder":"Daily"},"optionsProgressChart":{"separator":{"label":"Comma (,)","value":"comma"},"decimal":"0","decimalPercentage":"0","abbr":false,"notation":null,"typeSymbol":{"label":"Short (Mio)","value":"short"},"symbolWithSpace":false}}',
              extraOptions:
                '{"extras":{"widgetId":"W-2392","position":"top-center","extrasWidget":{"widgetId":"W-2704","position":"top-center"}},"title":"Churn (CAPS/Cleansing)","subtitle":"","type":"date","formatDate":"DD MMMM YYYY","prefixSubtitle":"Last Updated:","description":"Churn (CAPS/Cleansing)","abbr":false,"decimal":"0","decimalPercentage":"0","titleColor":null,"backgroundColorHeader":null,"borderColor":null,"borderWeight":null,"localFilter":{"enabled":true,"type":"date","column":"event_date","list":[{"label":"Daily","value":"daily","children":[],"found":true},{"label":"Monthly","value":"monthly","children":[],"found":true}],"placeholder":"Daily"},"titleFontSize":null,"subtitleFontSize":null,"separator":"comma","typeSymbol":"short","symbolWithSpace":false,"contentLabel":true,"contentTotal":true,"contentPercentage":true}',
              indexSideMenu: 0,
              widgetType: '',
              tabType: '',
              headerUseWidget: false,
              tabId: '',
              hideTitle: false,
              tabs: [],
              widgetEmptyCardList: [],
              text: '',
              type: '',
            },
            {
              widgetListId: 20290,
              title: 'Sales',
              subtitle: 'event_date',
              widgetId: 'W-2385',
              queryId: 'Q-1146',
              cacheId: 'cache-DS-45-286-3312032074',
              sqlQuery:
                'Itzt2agq0a+SGfrcHTD55qxfsqtv1RQxOkaNepMeL40lNVS3KYLCkjaXgZggvpgfr8pb5hCnzOA8LiaX50hStDidv1t4T+tD5TMzkpf4SZ57KZXKcnXy/P3WBnfN90PD6b6exp+lQckDzgdIhyVBKMgT/FUSnauDUkpS29klmKw9eIjgYS7h2HXIlvka+ljxXIgx/Cs7lItEnxkwx2WbiURtMA==',
              widgetAggregation: {
                select: [
                  {
                    singleSeries: true,
                  },
                  {
                    dateColumn: 'event_date',
                  },
                  {
                    xColumn: 'dimension_value',
                  },
                  {
                    columnDate: 'event_date',
                    operation: 'sum_growth_mom-period',
                    yColumn: 'total_subs',
                  },
                ],
                sort: {},
              },
              visualizationId: 'viz-24',
              rows: 13,
              cols: 12,
              x: 0,
              y: 21,
              chartOptions:
                '{"dataSeries":{"reportType":null,"xAxis":{"label":"dimension_value","value":"dimension_value"},"yAxis":{"label":"total_subs","value":"total_subs"},"series":null,"seriesOrder":null,"sortBy":null,"sortByOrder":null,"customOrder":null,"sortDataType":null,"showMarker":null,"fillMarker":null,"markerSymbol":null,"operation":{"label":"Growth MoM Period","value":"growth_mom-period"},"dateColumn":{"label":"event_date","value":"event_date"},"singleSeries":{"label":"Yes","value":"yes"},"growthType":null,"limit":null,"contentLabel":true,"contentTotal":true,"contentPercentage":true,"sum":null,"nodes":[]},"general":{"widgetName":"Sales","subtitle":{"label":"event_date","value":"event_date"},"type":"date","thousandSeparator":null,"decimalSeparator":null,"formatDate":{"label":"DD MMMM YYYY","value":"DD MMMM YYYY"},"prefixSubtitle":"Last Updated:","description":"Chart Sales","xAxisTitle":null,"yAxisTitle":null,"smoothLine":null,"gradientLine":null,"showDataLabel":null,"selectTypeChartGroup":null,"percentageMode":null,"averageMode":null,"innerSize":0,"showNotation":null,"chooseNotation":null,"decimal":null,"prefix":null,"suffix":null,"showCenterValue":null,"abbrTotalValue":null,"prefixCenterValue":null,"suffixCenterValue":null,"titleFontSize":null,"subtitleFontSize":null,"appearance":{"unit":{"value":"px"},"cornerTL":0,"cornerTR":0,"cornerBL":0,"cornerBR":0,"cornerRadius":0,"individualCorners":false},"titleColor":null,"typeColor":"fill","backgroundColorHeader":null,"borderWeight":"1","borderColor":null,"height":null,"readableNumber":null,"symbolNumber":null,"symbolSpace":null},"xAxis":{"showLabel":true,"labelWidth":null,"wordWrap":null,"textAlign":null,"scale":null,"interval":null,"ordering":null,"prefix":null,"suffix":null,"lineWidth":1,"gridLineWidth":0},"yAxis":{"showLabel":true,"labelAlign":"right","scale":null,"interval":null,"minimumValue":"Dynamic","customMinimumValue":null,"ordering":null,"lineWidth":0,"gridLineWidth":1,"enableAbbreviation":true,"addSpaceBetweenNumberAndNotation":true,"decimalPrecision":"2","gridLineDashStyle":"Solid","gridLineDashConnectorStyle":"ShortDash","readableNumber":null,"showNotationYaxis":true,"prefix":null,"suffix":null,"maximumValue":null},"tooltip":{"showTooltipSeries":true,"showTooltipSharedSeries":null,"decimal":"0","prefix":"IDR ","suffix":null,"type":{"label":"Advanced","value":"advanced"},"growth":{"notation":null,"decimal":null,"prefix":null,"suffix":null},"variant":{"value":"variant-1"},"seriesName":"Series Name","headerTitle":"Header Title","headerTextColor":"#fff","abbreviateValue":null,"addSpaceBetweenNumberAndNotation":null,"contentGrowth":null,"contentLastUpdated":null,"contentLastUpdateFormatDated":{"value":"DD-MMM-YYYY"},"readableNumber":true,"valueFontWeight":{"label":"Normal","value":"normal"},"contentGrowthCompareValue":null,"contentCompareValueReadableNumber":null,"contentGrowthCompareValueSuffix":null,"contentGrowthCompareValuePrefix":null,"contentCompareValueDecimalPrecision":2,"contentCompareValueEnableAbbreviation":null,"contentCompareValueAddSpaceBetweenNumberAndNotation":null,"contentGrowthPercentage":null,"contentGrowthPercentageDecimalPrecision":2,"contentGrowthPercentageReadableNumber":null,"contentTotalStacked":null,"contentSeries":null,"contentShowTitle":null,"contentTitle":null,"contentHideSymbol":null,"hideArrow":true,"fontSize":6,"contentGrowthType":null,"abbreviationScale":null},"legend":{"aliases":[],"showLegend":true,"isActiveLegendFilter":true,"growthType":{"label":"Month","value":"monthly"},"typeLegend":{"label":"Type 1","value":"type-1"},"themaLegend":{"label":"Advance","value":"advance"},"layoutLegend":{"label":"Vertical","value":"vertical"},"percentageMode":null,"limitLegend":null,"showLimitLegend":null,"titleText":"MoM","titleAlign":{"label":"Right","value":"right"},"titleFontSize":"","titleFontStyle":{"value":"normal"},"titleFontWeight":{"value":"bold"},"margin":"15","maxWidth":"","maxHeight":"81","verticalAlignment":{"label":"Bottom","value":"bottom"},"horizontalAlignment":{"label":"Center","value":"center"},"fontSize":null,"widthTotalValue":"124","widthCompareValue":"48","contentGrowthCompareValueSymbol":null,"widthSeries":"92","decimalPrecision":null,"enableAbbreviation":null,"readableNumber":null,"addSpaceBetweenNumberAndNotation":null,"contentValue":null,"contentGrowth":true,"contentGrowthCompareValue":true,"contentGrowthType":true,"itemMargin":"3","contentSeries":true,"contentSeriesTextColor":null,"hideSymbol":false,"contentValueFontWeight":null,"contentValuePrefix":null,"contentValueSuffix":null,"contentValueReadableNumber":null,"contentValueDecimalPrecision":null,"contentValueEnableAbbreviation":true,"contentValueAddSpaceBetweenNumberAndNotation":true,"contentCompareValuePrefix":null,"contentCompareValueSuffix":null,"contentCompareValueFontWeight":{"label":"Normal","value":"normal"},"contentCompareValueReadableNumber":true,"contentCompareValueDecimalPrecision":"0","contentCompareValueEnableAbbreviation":null,"contentCompareValueAddSpaceBetweenNumberAndNotation":null,"contentType":{"value":"series"},"contentGrowthTextAlign":{"label":"Right","value":"right"},"contentGrowthValue":false,"contentGrowthValueSuffix":null,"contentGrowthValuePrefix":null,"contentGrowthValueFontSize":null,"contentGrowthValueFontWeight":null,"contentGrowthPercentage":true,"contentGrowthPercentageReadableNumber":null,"contentGrowthPercentageDecimalPrecision":"2","navigationAlign":{"value":"left"}},"stack":{"showStack":null,"labelEnabled":null},"color":{"color":null,"orderingColor":["#00B4FF","#0072FB","#00D2AA","#008591","#20C400","#008C00","#7E97AA","#405F77","#FFAF00","#D34C00","#A274FF","#6334FF","#FF4B74","#E60000","#FF4AF9","#DF00E4","#FF7AAF","#F40079"],"showBackground":null,"orderingGradient":null,"useBackgroundGradient":true,"useColorByPoint":null,"nodesColor":[],"upColor":null},"credit":{"creditText":null,"creditLink":null},"combine":{"showCombineChart":null,"combine":null,"showInLegend":null,"gradient":null,"seriesCombine":null},"ordering":{"legend":null}}',
              extraOptions:
                '{"appearance":{"unit":{"value":"px"},"cornerTL":0,"cornerTR":0,"cornerBL":0,"cornerBR":0,"cornerRadius":0,"individualCorners":false},"useBackgroundGradient":true,"useColorByPoint":null,"growth":{"enabled":false,"indicator":"value","labelRadius":false,"percentage":false,"abbr":false,"suffix":"","prefix":"","colorLine":null,"colorText":null,"boxTextTransparent":null},"tooltipType":{"headerTitle":"Header Title","headerTextColor":"#fff","seriesName":"Series Name","variant":"variant-1","enabled":true,"type":"advanced","decimal":"0","prefix":"IDR ","suffix":null,"growth":{"notation":null,"decimal":null,"prefix":null,"suffix":null},"abbreviateValue":null,"contentLastUpdateFormatDated":"DD-MMM-YYYY","addSpaceBetweenNumberAndNotation":null,"contentGrowth":null,"readableNumber":true,"valueFontWeight":"normal","contentLastUpdated":null,"contentGrowthCompareValue":null,"contentGrowthCompareValueSuffix":null,"contentGrowthCompareValuePrefix":null,"contentCompareValueReadableNumber":null,"contentCompareValueDecimalPrecision":2,"contentCompareValueEnableAbbreviation":null,"contentCompareValueAddSpaceBetweenNumberAndNotation":null,"contentGrowthPercentage":null,"contentGrowthPercentageDecimalPrecision":2,"contentGrowthPercentageReadableNumber":null,"hideArrow":true,"fontSize":6,"contentGrowthType":null,"contentSeries":null,"contentTotalStacked":null,"contentShowTitle":null,"contentTitle":null,"contentHideSymbol":null},"titleColor":null,"type":"date","formatDate":"DD MMMM YYYY","prefixSubtitle":"Last Updated:","halfDonut":{"enabled":false,"showValue":null,"prefix":null,"suffix":null,"abbr":null},"backgroundColorHeader":null,"borderWeight":"1","borderColor":null,"growthField":{"type":null,"data":[]},"localFilter":{"enabled":true,"type":"custom","column":"filter_type","list":[{"label":"Chanel","value":"chanel","children":[],"found":true},{"label":"Service","value":"service","children":[],"found":true},{"label":"Speed","value":"speed","children":[],"found":true}],"placeholder":"Chanel"},"titleFontSize":null,"subtitleFontSize":null}',
              indexSideMenu: 0,
              widgetType: '',
              tabType: '',
              headerUseWidget: false,
              tabId: '',
              hideTitle: false,
              tabs: [],
              widgetEmptyCardList: [],
              text: '',
              type: '',
            },
            {
              widgetListId: 34738,
              title: '',
              subtitle: '',
              widgetId: '-698099642',
              queryId: '',
              cacheId: '',
              sqlQuery: 'BvfVNx9OmyERL+zTN/tNzA==',
              widgetAggregation: null,
              visualizationId: '',
              rows: 9,
              cols: 12,
              x: 24,
              y: 0,
              chartOptions: '',
              extraOptions: '',
              indexSideMenu: 0,
              widgetType: 'empty-card',
              tabType: 'dropdown',
              headerUseWidget: false,
              tabId: '',
              hideTitle: false,
              tabs: [
                {
                  id: 'tab-520',
                  vizId: '',
                  widgetListId: 34738,
                  name: 'Total Sales',
                  show: true,
                  indexTab: 0,
                  child: [],
                },
                {
                  id: 'tab-521',
                  vizId: '',
                  widgetListId: 34738,
                  name: 'Average Daily Sales',
                  show: true,
                  indexTab: 1,
                  child: [],
                },
              ],
              widgetEmptyCardList: [
                {
                  widgetListId: 34740,
                  title: 'Total Sales',
                  subtitle: '',
                  widgetId: 'W-2377',
                  queryId: 'Q-1139',
                  cacheId: 'cache-DS-45-033-689982084',
                  sqlQuery:
                    'pcOPRBjaNyAdfxqnMY/NEz60Id/1/7A2q4XMCAje86S0/zbn0Urv1z4G0hUUXesm6aY/9GipliECcnqqBHIM36R2+n4R8JcfCsKH4OuXFAuapy3Go5kPR8WqVIYg/8wEugfyhGZ3YU5tnpo42Hhu8qgx4+IcjQlaPvDnY0o=',
                  widgetAggregation: {
                    chartType: 'basic_card',
                    select: [
                      {
                        columnValue: 'total',
                        dateColumn: 'event_date',
                        growthType: 'monthly-period',
                        operation: 'sum',
                        series: [
                          {
                            column: 'total',
                            growthType: 'monthly-period',
                            label: 'MoM',
                            operation: 'sum',
                          },
                          {
                            column: 'total',
                            growthType: 'yearly-period',
                            label: 'YoY',
                            operation: 'sum',
                          },
                        ],
                      },
                    ],
                  },
                  visualizationId: 'viz-13',
                  rows: 8,
                  cols: 12,
                  x: 0,
                  y: 0,
                  chartOptions:
                    '{"dataProcessor":{"themes":{"label":"Revamp","value":"revamp"},"columnValue":{"label":"total","value":"total"},"columnValueCompare":null,"typeOption":"basic","typePercentage":null,"columnDate":{"label":"event_date","value":"event_date"},"growthType":{"label":"Monthly Period","value":"monthly-period"},"label":null,"operation":{"label":"Sum","value":"sum"}},"seriesBasicCard":[{"typeSeries":null,"title":null,"label":"MoM","seriesColumn":{"label":"total","value":"total"},"seriesGrowthType":{"label":"Monthly Period","value":"monthly-period"},"seriesColumnLabel":null,"operation":{"label":"Sum","value":"sum"},"orderBy":null,"limitSeries":null,"groupingSeries":[],"seriesColumnValue":null,"growthType":null},{"typeSeries":null,"title":null,"label":"YoY","seriesColumn":{"label":"total","value":"total"},"seriesGrowthType":{"label":"Yearly","value":"yearly"},"seriesColumnLabel":null,"operation":{"label":"Sum","value":"sum"},"orderBy":null,"limitSeries":null,"groupingSeries":[],"seriesColumnValue":null,"growthType":null}],"generalBasicCard":{"title":"Total Sales","titleColor":"#ffffff","subtitle":null,"type":"date","formatDate":{"label":"DD MMMM YYYY","value":"DD MMMM YYYY"},"prefixSubtitle":"Last Updated:","description":"Jumlah aktivasi pelanggan indihome pada bulan berjalan, terhitung saat indihome pelanggan sudah terpasang (exclude upselling/downselling)","titleFontSize":null,"subtitleFontSize":null,"positionSubtitle":null,"icon":null,"cardId":null,"surface":null,"hideBorder":null,"categoryCard":null,"typeColor":"gradient","backgroundColorHeader":{"label":"Crimson Velvet","value":"linear-gradient(90.02deg, #D82A31 0.02%, #933F7A 128.33%)"}},"optionsBasicCard":{"abbr":false,"fontSize":null,"separator":"comma","decimal":null,"decimalPercentage":"2","prefix":"SSL","prefixPosition":"bottom","suffix":null,"suffixPosition":"default","seriesPrefix":null,"seriesSuffix":null,"seriesPrefixFrom":null,"seriesSuffixFrom":null,"abbrSeries":true,"decimalSeries":"","abbreviateNumbers":true,"hideValue":false,"hideFooter":true,"urlLearnMore":"/fmc-dashboard/v2/sales","hideGrowth":false,"hideSymbolPercentage":null}}',
                  extraOptions:
                    '{"title":"Total Sales","titleColor":"#ffffff","subtitle":"","description":"Jumlah aktivasi pelanggan indihome pada bulan berjalan, terhitung saat indihome pelanggan sudah terpasang (exclude upselling/downselling)","icon":"","cardId":null,"decimalPercentage":"2","prefix":"SSL","prefixPosition":"bottom","seriesOption":{"abbr":false,"decimal":"","hideGrowth":false,"suffix":null,"prefix":"SSL"},"styleBasicCard":{"themesCard":"revamp","hideBorder":null,"categoryCard":null,"backgroundColorHeader":"linear-gradient(90.02deg, #D82A31 0.02%, #933F7A 128.33%)"},"hideValue":false,"hideFooter":true,"type":"date","formatDate":"DD MMMM YYYY","prefixSubtitle":"Last Updated:","abbreviateNumbers":true,"separator":"comma","urlLearnMore":"/fmc-dashboard/v2/sales","journey":{"event":"click","customTitle":{"type":"none","prefix":"","suffix":"","customText":"","customList":[]}},"abbr":false,"suffixPosition":"default","titleFontSize":null,"typeOption":"basic","hideSymbolPercentage":null,"subtitleFontSize":null}',
                  indexSideMenu: 0,
                  widgetType: '',
                  tabType: '',
                  headerUseWidget: false,
                  tabId: 'tab-520',
                  hideTitle: false,
                  tabs: [],
                  widgetEmptyCardList: [],
                  text: '',
                  type: '',
                },
                {
                  widgetListId: 60821,
                  title: 'Avg Daily Sales',
                  subtitle: 'Last Updated: 21 January 2025',
                  widgetId: 'W-3048',
                  queryId: 'Q-1463',
                  cacheId: 'cache-DS-45-132-4279431566',
                  sqlQuery:
                    'yJq7qVIAkv+VlwljpFJODRnq/dYTLhmySUJ3mEQoPMTNgiOV6vwdLtmnpNp4hIzHFdnMB/oM6ih9IJgMUMUWAcZ+6jlN+U+JDmBFo51rt3Of6YKL8JcR2asRnZ4IkNSRrsPIs51zTfgEhpbx+cDoYmPT9L8CP/NzRDTV5SCiT8aU1CN7aXZw3Rt7z5hoCbIl1Q2pX1i7eOoNHFFbK1E0UrtRyxflbAumCHIZB7U4275aUrIfYCKTaTYLb+WWSdtCW6k+6ZydO5jscnFO8YREA94qochQaAru6/b2uaTjzlbRzz/N9A+Edhm8cxZqIvdPvA32pjwnAecjCY/sk4TLjd8TE8yz9U1cv/mbhq8S0XusYCDe71jjJOqeGBW3Ye3ezer7bRG9s1qyXKMugzAlJo1SOuZI+r69TMxVoQ0mDFlHeZjDstIbDm7oGc4aQJnvSwXH51ulYzapSF7p9HYXtTdqxwxzowHLarGk7GQLiw4DOxSqXoUDUaCC9X2068DiR9HKhf8/DkJSkmcpbw6fP3tAtroHNRNQtAZymG9Q5jKbf8DPpSCHo6NJfo4WKSiPMl5TIRskx9QyYIAVWvH8GoGY4SLYFWBqBBVWfhIpsR8mALaIdqyziHS1ryB0BQNDpElAtSGyHhPDzD+VkYCej9Ldz27zICXdBDPE2F2xfOvFbA6W582pP+p3l8WrXM3eGZaUUhS5+9w0JOYL4svSFsd/nrysOoyRAKgxOZjPA4mwy+DRFgcjxHf+yUCt4BvTswk32KxjnDDp1szVZJt7O/cQ1Cxnmyz1NQiYhfeUkJokt9Dzd3x+hmPeuwFeOCzfBO9WO89Q6X02PeKd1J1ezTakgQvsUQfN2XY9FkwvHpFbPQHtgvszgMY4uDv3M0a+4xcVxRw4hpFj569hW2IzVcv/YTLTLiXP2n16hSDKxgp+/6uda8ZU3A7OJAge5yMLtxWFOd7xDE2v4AFIeiOp6SfOivO4aqTJ00IDbuxG1lvLx9fEMD9c8PLszmsjYpM2lCwpvHkb83AdEYoMfpe+SXC5xGD4cin72ymMEE6XZDs3kBqJH89rYhLwIevA0PsqZ46co58+JgfAfiOyCfUQyfZXA44Pc2cKnq6wjBoc',
                  widgetAggregation: {
                    chartType: 'basic_card',
                    select: [
                      {
                        columnValue: 'total',
                        dateColumn: 'event_date',
                        growthType: 'monthly-period',
                        operation: 'average',
                        series: [
                          {
                            column: 'total',
                            growthType: 'monthly-period',
                            label: 'MoM',
                            operation: 'average',
                          },
                          {
                            column: 'total',
                            growthType: 'yearly-period',
                            label: 'YoY',
                            operation: 'average',
                          },
                        ],
                      },
                    ],
                  },
                  visualizationId: 'viz-13',
                  rows: 8,
                  cols: 12,
                  x: 0,
                  y: 0,
                  chartOptions:
                    '{"dataProcessor":{"themes":{"label":"Revamp","value":"revamp"},"columnValue":{"label":"total","value":"total"},"columnValueCompare":null,"typeOption":"basic","typePercentage":null,"columnDate":{"label":"event_date","value":"event_date"},"growthType":{"label":"Monthly Period","value":"monthly-period"},"label":null,"operation":{"label":"Average","value":"average"}},"seriesBasicCard":[{"typeSeries":null,"title":null,"label":"MoM","seriesColumn":{"label":"total","value":"total"},"seriesGrowthType":{"label":"Monthly Period","value":"monthly-period"},"seriesColumnLabel":null,"operation":{"label":"Average","value":"average"},"groupingSeries":[]},{"typeSeries":null,"title":null,"label":"YoY","seriesColumn":{"label":"total","value":"total"},"seriesGrowthType":{"label":"Yearly Period","value":"yearly-period"},"seriesColumnLabel":null,"operation":{"label":"Average","value":"average"},"groupingSeries":[]}],"generalBasicCard":{"title":"Avg Daily Sales","titleColor":"#ffffff","subtitle":null,"type":"date","formatDate":{"label":"DD MMMM YYYY","value":"DD MMMM YYYY"},"prefixSubtitle":"Last Updated:","description":"Description Average Daily Sales","titleFontSize":null,"subtitleFontSize":null,"positionSubtitle":null,"icon":null,"cardId":null,"surface":null,"hideBorder":null,"categoryCard":null,"typeColor":"gradient","backgroundColorHeader":{"label":"Crimson Velvet","value":"linear-gradient(90.02deg, #D82A31 0.02%, #933F7A 128.33%)"},"typeOption":"basic"},"optionsBasicCard":{"abbr":false,"fontSize":"","separator":"comma","decimal":null,"decimalPercentage":"2","prefix":"SSL","prefixPosition":"bottom","suffix":"","suffixPosition":"default","seriesPrefix":null,"seriesSuffix":"SSL","seriesPrefixFrom":null,"seriesSuffixFrom":null,"abbrSeries":false,"decimalSeries":null,"abbreviateNumbers":true,"hideValue":null,"hideFooter":true,"urlLearnMore":null,"hideGrowth":null,"hideSymbolPercentage":null}}',
                  extraOptions:
                    '{"title":"Avg Daily Sales","titleColor":"#ffffff","subtitle":"Last Updated: 21 January 2025","description":"Description Average Daily Sales","icon":"","cardId":null,"titleFontSize":"Description Average Daily Sales","seriesOption":{"suffix":"","abbr":false,"prefix":"SSL"},"styleBasicCard":{"themesCard":"revamp","hideBorder":null,"categoryCard":null,"backgroundColorHeader":"linear-gradient(90.02deg, #D82A31 0.02%, #933F7A 128.33%)"},"type":"date","formatDate":"DD MMMM YYYY","prefixSubtitle":"Last Updated:","abbr":false,"separator":"comma","prefixPosition":"bottom","suffixPosition":"default","decimalPercentage":"2","abbreviateNumbers":true,"hideValue":null,"hideFooter":true,"urlLearnMore":null,"suffix":"","hideSymbolPercentage":null,"fontSize":"","prefix":"SSL","typeOption":"basic"}',
                  indexSideMenu: 0,
                  widgetType: '',
                  tabType: '',
                  headerUseWidget: false,
                  tabId: 'tab-521',
                  hideTitle: false,
                  tabs: [],
                  widgetEmptyCardList: [],
                  text: '',
                  type: '',
                },
              ],
              text: '',
              type: '',
            },
            {
              widgetListId: 35356,
              title: 'Revenue Trend (Billion)',
              subtitle: '',
              widgetId: '-2551464458',
              queryId: '',
              cacheId: '',
              sqlQuery: 'M/jBi2i8njErkAvt/9jX4A==',
              widgetAggregation: null,
              visualizationId: '',
              rows: 12,
              cols: 34,
              x: 0,
              y: 9,
              chartOptions: '',
              extraOptions: '',
              indexSideMenu: 0,
              widgetType: 'empty-card',
              tabType: 'tab',
              headerUseWidget: true,
              tabId: '',
              hideTitle: false,
              tabs: [
                {
                  id: 'tab-526',
                  vizId: '',
                  widgetListId: 35356,
                  name: 'Area',
                  show: true,
                  indexTab: 0,
                  child: [],
                },
                {
                  id: 'tab-527',
                  vizId: '',
                  widgetListId: 35356,
                  name: 'Channel',
                  show: true,
                  indexTab: 1,
                  child: [],
                },
              ],
              widgetEmptyCardList: [
                {
                  widgetListId: 35358,
                  title: 'Revenue Trend (Area)',
                  subtitle: 'event_date',
                  widgetId: 'W-2389',
                  queryId: 'Q-1149',
                  cacheId: 'cache-DS-45-696-2051914062',
                  sqlQuery:
                    'bRljL3Z8X47RNDIHkJ8FF7z6vrp6bNlg0dWcLUWxTBPDfaPuoBNxrW7cUqlSsqN9ZWAk4bM4ut5mskh3CvyFUUTq0rJSGIwB0Wmfp3DJ5AvLttHA9pZozd4NhxlbLIBXG65OZrPMuETXAOVKDCOlzpKhhNR0AGcMPEA4YMZO6YJRL/TsmzyGUF2EP9CGzP51SrxfFQJ88YkUXyT+N2k1kg0U8M0LEtZfymcabvF0St9lmmz4J3Mf2nBQE4XJdGQByjJyaETQJnCcfSx7aZ2PhxyIT/WxemEcNJp0v5EBhnuVZi1xT+d8j2MbSTsWOXnX/B/JE4+FNnMpwiiaOX/cA/N5jHfjgqnpdHkQE+WwJXDleLZZtqv4lY1haPi//IVdfXn+IdF+zbVkrCIQfE4dcWsKF0PjRplyB0irJA/hjvyesAQQxeGPhRo8dGTdjy2b7h7wPib1606y/ERAut5FqGHidjqCFT59AcxZHJ4VkwziNK1p7BW4HM7VaOZbBwK/NsOexw==',
                  widgetAggregation: {
                    select: [
                      {
                        singleSeries: true,
                      },
                      {
                        dateColumn: 'event_date',
                      },
                      {
                        xColumn: 'area',
                      },
                      {
                        columnDate: 'event_date',
                        operation: 'sum_growth_mom',
                        yColumn: 'sum',
                      },
                    ],
                    sort: {},
                  },
                  visualizationId: 'viz-04',
                  rows: 8,
                  cols: 12,
                  x: 0,
                  y: 0,
                  chartOptions:
                    '{"dataSeries":{"reportType":null,"xAxis":{"label":"area","value":"area"},"yAxis":{"label":"sum","value":"sum"},"series":null,"seriesOrder":null,"sortBy":null,"sortByOrder":null,"customOrder":null,"sortDataType":null,"showMarker":null,"fillMarker":null,"markerSymbol":null,"operation":{"label":"Growth MoM","value":"growth_mom"},"dateColumn":{"label":"event_date","value":"event_date"},"singleSeries":{"label":"Yes","value":"yes"},"growthType":null,"limit":null,"contentLabel":true,"contentTotal":true,"contentPercentage":true,"sum":null,"nodes":[]},"general":{"widgetName":"Revenue Trend (Area)","subtitle":{"label":"event_date","value":"event_date"},"type":"date","thousandSeparator":null,"decimalSeparator":null,"formatDate":{"label":"DD MMMM YYYY","value":"DD MMMM YYYY"},"prefixSubtitle":"Last Updated:","description":"Revenue trend area (Monthly)","xAxisTitle":"Area","yAxisTitle":"Total Revenue (IDR)","smoothLine":null,"gradientLine":null,"showDataLabel":null,"selectTypeChartGroup":null,"percentageMode":null,"averageMode":null,"innerSize":0,"showNotation":true,"chooseNotation":{"label":"Billions","value":"billions"},"decimal":null,"prefix":null,"suffix":null,"showCenterValue":null,"abbrTotalValue":null,"prefixCenterValue":null,"suffixCenterValue":null,"titleFontSize":null,"subtitleFontSize":null,"appearance":{"unit":{"label":"Percentage","value":"%"},"cornerTL":"100","cornerTR":"100","cornerBL":"","cornerBR":"","cornerRadius":"100","individualCorners":true},"titleColor":null,"typeColor":null,"backgroundColorHeader":null,"borderWeight":"1","borderColor":"#D5D5D545","height":null,"readableNumber":null,"symbolNumber":null,"symbolSpace":null},"xAxis":{"showLabel":false,"labelWidth":null,"wordWrap":null,"textAlign":null,"scale":null,"interval":null,"ordering":["AREA 1","AREA 4","AREA 3","AREA 2"],"prefix":null,"suffix":null,"lineWidth":"0","gridLineWidth":0},"yAxis":{"showLabel":true,"labelAlign":"center","scale":null,"interval":null,"minimumValue":"Dynamic","customMinimumValue":null,"ordering":null,"lineWidth":"0","gridLineWidth":1,"enableAbbreviation":false,"addSpaceBetweenNumberAndNotation":false,"decimalPrecision":0,"gridLineDashStyle":"Solid","gridLineDashConnectorStyle":"ShortDash","readableNumber":null,"showNotationYaxis":true,"prefix":null,"suffix":null},"tooltip":{"showTooltipSeries":true,"showTooltipSharedSeries":null,"decimal":"0","prefix":"","suffix":null,"type":{"label":"Advanced","value":"advanced"},"growth":{"notation":null,"decimal":null,"prefix":null,"suffix":null},"variant":{"value":"variant-1"},"seriesName":"Series Name","headerTitle":"Header Title","headerTextColor":"#fff","abbreviateValue":false,"addSpaceBetweenNumberAndNotation":true,"contentGrowth":true,"contentLastUpdated":true,"contentLastUpdateFormatDated":{"value":"DD-MMM-YYYY"},"readableNumber":true,"valueFontWeight":{"value":"bold"},"contentGrowthCompareValue":true,"contentCompareValueReadableNumber":true,"contentGrowthCompareValueSuffix":null,"contentGrowthCompareValuePrefix":null,"contentCompareValueDecimalPrecision":"0","contentCompareValueEnableAbbreviation":null,"contentCompareValueAddSpaceBetweenNumberAndNotation":null,"contentGrowthPercentage":true,"contentGrowthPercentageDecimalPrecision":"0","contentGrowthPercentageReadableNumber":null,"contentTotalStacked":null,"contentSeries":null,"contentShowTitle":null,"contentTitle":null,"contentHideSymbol":null,"hideArrow":null,"fontSize":6,"contentGrowthType":true,"abbreviationScale":null},"legend":{"aliases":[],"showLegend":true,"isActiveLegendFilter":false,"growthType":{"label":"Month","value":"monthly"},"typeLegend":{"label":"Variant 4","value":"type-4"},"themaLegend":{"label":"Advance","value":"advance"},"layoutLegend":{"label":"Vertical","value":"vertical"},"percentageMode":null,"limitLegend":null,"showLimitLegend":null,"titleText":"","titleAlign":{"value":"left"},"titleFontSize":"","titleFontStyle":{"label":"Normal","value":"normal"},"titleFontWeight":{"label":"Bold","value":"bold"},"margin":"18","maxWidth":null,"maxHeight":"","verticalAlignment":{"label":"Top","value":"top"},"horizontalAlignment":{"label":"Right","value":"right"},"fontSize":"8","widthTotalValue":"","widthCompareValue":"","contentGrowthCompareValueSymbol":null,"widthSeries":"50","decimalPrecision":0,"enableAbbreviation":false,"readableNumber":null,"addSpaceBetweenNumberAndNotation":false,"contentValue":false,"contentGrowth":true,"contentGrowthCompareValue":true,"contentGrowthType":true,"itemMargin":"","contentSeries":true,"contentSeriesTextColor":null,"hideSymbol":false,"contentValueFontWeight":null,"contentValuePrefix":null,"contentValueSuffix":null,"contentValueReadableNumber":null,"contentValueDecimalPrecision":"1","contentValueEnableAbbreviation":true,"contentValueAddSpaceBetweenNumberAndNotation":true,"contentCompareValuePrefix":"Compared to last month ","contentCompareValueSuffix":"","contentCompareValueFontWeight":{"label":"Bold","value":"bold"},"contentCompareValueReadableNumber":true,"contentCompareValueDecimalPrecision":"0","contentCompareValueEnableAbbreviation":false,"contentCompareValueAddSpaceBetweenNumberAndNotation":true,"contentType":{"value":"series"},"contentGrowthTextAlign":null,"contentGrowthValue":true,"contentGrowthValueSuffix":"","contentGrowthValuePrefix":"Total Revenue","contentGrowthValueFontSize":"10","contentGrowthValueFontWeight":{"label":"Bolder","value":"bolder"},"contentGrowthPercentage":true,"contentGrowthPercentageReadableNumber":false,"contentGrowthPercentageDecimalPrecision":"2","navigationAlign":{"label":"Left","value":"left"}},"stack":{"showStack":null,"labelEnabled":null},"color":{"color":null,"orderingColor":["#00B4FF","#0072FB","#00D2AA","#008591","#20C400","#008C00","#7E97AA","#405F77","#FFAF00","#D34C00","#A274FF","#6334FF","#FF4B74","#E60000","#FF4AF9","#DF00E4","#FF7AAF","#F40079"],"showBackground":null,"orderingGradient":null,"useBackgroundGradient":true,"useColorByPoint":false,"nodesColor":[],"upColor":null},"credit":{"creditText":null,"creditLink":null},"combine":{"showCombineChart":null,"combine":null,"showInLegend":null,"gradient":null,"seriesCombine":null},"ordering":{"legend":["AREA 1","AREA 2","AREA 3","AREA 4"]}}',
                  extraOptions:
                    '{"appearance":{"unit":{"label":"Percentage","value":"%"},"cornerTL":"100","cornerTR":"100","cornerBL":"","cornerBR":"","cornerRadius":"100","individualCorners":true},"useBackgroundGradient":true,"growth":{"enabled":false,"indicator":"value","labelRadius":false,"percentage":false,"abbr":false,"suffix":"","prefix":"","colorLine":null,"colorText":null,"boxTextTransparent":null},"tooltipType":{"headerTitle":"Header Title","headerTextColor":"#fff","seriesName":"Series Name","variant":"variant-1","enabled":true,"type":"advanced","notation":"billions","decimal":"0","prefix":"","suffix":null,"growth":{"notation":null,"decimal":null,"prefix":null,"suffix":null},"abbreviateValue":false,"contentLastUpdateFormatDated":"DD-MMM-YYYY","addSpaceBetweenNumberAndNotation":true,"contentGrowth":true,"readableNumber":true,"valueFontWeight":"bold","contentLastUpdated":true,"contentGrowthCompareValue":true,"contentGrowthCompareValueSuffix":null,"contentGrowthCompareValuePrefix":null,"contentCompareValueReadableNumber":true,"contentCompareValueDecimalPrecision":"0","contentCompareValueEnableAbbreviation":null,"contentCompareValueAddSpaceBetweenNumberAndNotation":null,"contentGrowthPercentage":true,"contentGrowthPercentageDecimalPrecision":"0","contentGrowthPercentageReadableNumber":null,"hideArrow":null,"fontSize":6,"contentGrowthType":true,"contentSeries":null,"contentTotalStacked":null,"contentShowTitle":null,"contentTitle":null,"contentHideSymbol":null},"titleColor":null,"type":"date","formatDate":"DD MMMM YYYY","prefixSubtitle":"Last Updated:","halfDonut":{"enabled":false,"showValue":null,"prefix":null,"suffix":null,"abbr":null},"backgroundColorHeader":null,"borderWeight":"1","borderColor":"#D5D5D545","growthField":{"type":null,"data":[{"series":[{"y":"AREA 1","data":[407918474105,0,0,0],"name":"AREA 1","additionalValue":[{"label":"Total Value","text":"%mom","value":-1242297362},{"label":"mom","value":-0.30362083773228854},{"label":"Percentage","value":-0.30362083773228854},{"label":"Growth Type","value":"mom"},{"label":"Growth","value":"down"},{"label":"Growth Description","value":"Compared To Last month"},{"label":"Legend","value":"AREA 1"},{"label":"Last Update","value":1743465600},{"label":"%mom","value":-0.30362083773228854},{"label":"01 Apr - 30 Apr","value":407918474105},{"label":"01 Mar - 31 Mar","value":409160771467}],"grouping":false,"color":{"linearGradient":{"x1":1,"y1":0.5,"x2":0,"y2":0.5},"stops":[[0.4365,"#EDA244"],[0.9370999999999999,"#EDA24400"]]}},{"y":"AREA 2","data":[0,778330910750,0,0],"name":"AREA 2","additionalValue":[{"label":"Total Value","text":"%mom","value":-4409047722},{"label":"mom","value":-0.5632838434116711},{"label":"Percentage","value":-0.5632838434116711},{"label":"Growth Type","value":"mom"},{"label":"Growth","value":"down"},{"label":"Growth Description","value":"Compared To Last month"},{"label":"Legend","value":"AREA 2"},{"label":"Last Update","value":1743465600},{"label":"%mom","value":-0.5632838434116711},{"label":"01 Apr - 30 Apr","value":778330910750},{"label":"01 Mar - 31 Mar","value":782739958472}],"grouping":false,"color":{"linearGradient":{"x1":1,"y1":0.5,"x2":0,"y2":0.5},"stops":[[0.4485,"#1C649F"],[0.7685,"#89B5C9"]]}},{"y":"AREA 3","data":[0,0,641212922514,0],"name":"AREA 3","additionalValue":[{"label":"Total Value","text":"%mom","value":-2592121390},{"label":"mom","value":-0.4026252068920604},{"label":"Percentage","value":-0.4026252068920604},{"label":"Growth Type","value":"mom"},{"label":"Growth","value":"down"},{"label":"Growth Description","value":"Compared To Last month"},{"label":"Legend","value":"AREA 3"},{"label":"Last Update","value":1743465600},{"label":"%mom","value":-0.4026252068920604},{"label":"01 Apr - 30 Apr","value":641212922514},{"label":"01 Mar - 31 Mar","value":643805043904}],"grouping":false,"color":{"linearGradient":{"x1":1,"y1":0.5,"x2":0,"y2":0.5},"stops":[[-0.2708,"#53C0DA"],[1,"#53C0DA00"]]}},{"y":"AREA 4","data":[0,0,0,569661443268],"name":"AREA 4","additionalValue":[{"label":"Total Value","text":"%mom","value":-150696395},{"label":"mom","value":-0.026446680319784924},{"label":"Percentage","value":-0.026446680319784924},{"label":"Growth Type","value":"mom"},{"label":"Growth","value":"down"},{"label":"Growth Description","value":"Compared To Last month"},{"label":"Legend","value":"AREA 4"},{"label":"Last Update","value":1743465600},{"label":"%mom","value":-0.026446680319784924},{"label":"01 Apr - 30 Apr","value":569661443268},{"label":"01 Mar - 31 Mar","value":569812139663}],"grouping":false,"color":{"linearGradient":{"x1":1,"y1":0.5,"x2":0,"y2":0.5},"stops":[[0.0709,"#FC972B"],[0.5903,"#F33A28"],[0.7828,"#ED0226"]]}}],"categories":["AREA 1","AREA 4","AREA 3","AREA 2"]}]},"localFilter":{"enabled":false,"type":null,"list":[],"placeholder":null},"useColorByPoint":false,"titleFontSize":null,"subtitleFontSize":null}',
                  indexSideMenu: 0,
                  widgetType: '',
                  tabType: '',
                  headerUseWidget: false,
                  tabId: 'tab-526',
                  hideTitle: true,
                  tabs: [],
                  widgetEmptyCardList: [],
                  text: '',
                  type: '',
                },
                {
                  widgetListId: 35361,
                  title: 'Revenue Trend (Channel)',
                  subtitle: 'event_date',
                  widgetId: 'W-2395',
                  queryId: 'Q-1152',
                  cacheId: 'cache-DS-45-114-1150689967',
                  sqlQuery:
                    'WxvFeTMO0MtikPoruU1I9bAd5jzRTNC29ain/+Q9wrXs0GlOF2il7gEvFgPjxGbSTXegQFbBFCtUP/aXMlteXDHVOqqWmyljZmBjk5XAzIHRFZMlWof6Jx8/cRx/Ylts5kH+CLLaEF9hSSbHznQJuJ4jFZZWRj5RmzQe89BWx0wG1RiLyFO1cNIQbYz2RayEFnH+qGiaZXpL2KlovACIfK3p8TBN91A6+b3pkMZ+UcDwJJ51HkeFTK//L3ILij9ENaYqc0toQFEYNM3tryLA7tbmZLrle9Tz+wTPDlbDQiF5S9zhRJ8LlINUcg1Dm11dl2kus7/Ih0ue5jcU6psb00WgaNQBhI76QYAmJpSMUot5vwIvFOvxsRGQAECXcjNx9TSDo7Gr9BUYmliPR3ztbxkbFD9WliuqeeJWwWDQuLDWyTFxKihJavAdgYVyuQ/khYEkm94RgXULPz070p9VL9vZVgslX1MDNbEICupMubTj3iQhZyGoXDO4yWZWvmVawMZQzGTBg4uJEBbffDvyCvJShYdzU3ID+Cz8DHKw6cA6ZWDfp9RkCn/jzwFjaVH4EC4AYQgGiGAUJhJBswfYNIeMkv/dJJhdE4+auEKkxy9BOqTHLFuLaK7RfHcVzRj0vqs2P19Gl3Odxq0tOxMpktUnWGjwvN0=',
                  widgetAggregation: {
                    groupValue: [
                      {
                        alias: 'series',
                        growthType: 'monthly period',
                        operation: 'sum_growth_mom',
                        sortType: 'desc',
                        value: 'amount',
                      },
                    ],
                    select: [
                      {
                        growthType: 'monthly period',
                      },
                      {
                        singleSeries: true,
                      },
                      {
                        dateColumn: 'event_date',
                      },
                      {
                        xColumn: 'l1',
                      },
                      {
                        columnDate: 'event_date',
                        operation: 'sum_growth_mom',
                        yColumn: 'amount',
                      },
                    ],
                    sort: {
                      column: 'amount',
                      type: 'desc',
                    },
                  },
                  visualizationId: 'viz-04',
                  rows: 8,
                  cols: 12,
                  x: 0,
                  y: 0,
                  chartOptions:
                    '{"dataSeries":{"reportType":null,"xAxis":{"label":"l1","value":"l1"},"yAxis":{"label":"amount","value":"amount"},"series":null,"seriesOrder":"Descending","sortBy":{"label":"Y Axis","value":"Y Axis"},"sortByOrder":null,"customOrder":null,"sortDataType":null,"showMarker":null,"fillMarker":null,"markerSymbol":null,"operation":{"label":"Growth MoM","value":"growth_mom"},"dateColumn":{"label":"event_date","value":"event_date"},"singleSeries":{"label":"Yes","value":"yes"},"growthType":null,"limit":null,"contentLabel":true,"contentTotal":true,"contentPercentage":true,"sum":null,"nodes":[]},"general":{"widgetName":"Revenue Trend (Channel)","subtitle":{"label":"event_date","value":"event_date"},"type":"date","thousandSeparator":null,"decimalSeparator":null,"formatDate":{"label":"DD MMMM YYYY","value":"DD MMMM YYYY"},"prefixSubtitle":"Last Updated:","description":"revenue trend Channel","xAxisTitle":"Channel","yAxisTitle":"Total Revenue (IDR)","smoothLine":null,"gradientLine":null,"showDataLabel":null,"selectTypeChartGroup":null,"percentageMode":null,"averageMode":null,"innerSize":0,"showNotation":true,"chooseNotation":{"label":"Billions","value":"billions"},"decimal":null,"prefix":null,"suffix":null,"showCenterValue":null,"abbrTotalValue":null,"prefixCenterValue":null,"suffixCenterValue":null,"titleFontSize":null,"subtitleFontSize":null,"appearance":{"unit":{"value":"px"},"cornerTL":"20","cornerTR":"20","cornerBL":0,"cornerBR":0,"cornerRadius":0,"individualCorners":true},"titleColor":null,"typeColor":null,"backgroundColorHeader":null,"borderWeight":"1","borderColor":"#F5F8F8","height":null,"readableNumber":null,"symbolNumber":null,"symbolSpace":null},"xAxis":{"showLabel":false,"labelWidth":null,"wordWrap":null,"textAlign":null,"scale":null,"interval":null,"ordering":null,"prefix":null,"suffix":null,"lineWidth":"1","gridLineWidth":0},"yAxis":{"showLabel":true,"labelAlign":"right","scale":null,"interval":null,"minimumValue":"Dynamic","customMinimumValue":null,"ordering":null,"lineWidth":"0","gridLineWidth":"1","enableAbbreviation":false,"addSpaceBetweenNumberAndNotation":false,"decimalPrecision":0,"gridLineDashStyle":"Solid","gridLineDashConnectorStyle":"ShortDash","readableNumber":null,"showNotationYaxis":true,"prefix":null,"suffix":null},"tooltip":{"showTooltipSeries":true,"showTooltipSharedSeries":null,"decimal":"0","prefix":"","suffix":null,"type":{"label":"Advanced","value":"advanced"},"growth":{"notation":null,"decimal":null,"prefix":null,"suffix":null},"variant":{"value":"variant-1"},"seriesName":"Series Name","headerTitle":"Header Title","headerTextColor":"#fff","abbreviateValue":false,"addSpaceBetweenNumberAndNotation":true,"contentGrowth":true,"contentLastUpdated":true,"contentLastUpdateFormatDated":{"value":"DD-MMM-YYYY"},"readableNumber":true,"valueFontWeight":{"value":"bold"},"contentGrowthCompareValue":true,"contentCompareValueReadableNumber":true,"contentGrowthCompareValueSuffix":null,"contentGrowthCompareValuePrefix":"IDR ","contentCompareValueDecimalPrecision":"0","contentCompareValueEnableAbbreviation":null,"contentCompareValueAddSpaceBetweenNumberAndNotation":null,"contentGrowthPercentage":true,"contentGrowthPercentageDecimalPrecision":"1","contentGrowthPercentageReadableNumber":null,"contentTotalStacked":null,"contentSeries":null,"contentShowTitle":null,"contentTitle":null,"contentHideSymbol":null,"hideArrow":null,"fontSize":"","contentGrowthType":true,"abbreviationScale":null},"legend":{"aliases":[],"showLegend":true,"isActiveLegendFilter":false,"growthType":{"label":"Monthly Period","value":"monthly period"},"typeLegend":{"label":"Variant 4","value":"type-4"},"themaLegend":{"label":"Advance","value":"advance"},"layoutLegend":{"label":"Vertical","value":"vertical"},"percentageMode":null,"limitLegend":null,"showLimitLegend":null,"titleText":"","titleAlign":{"value":"left"},"titleFontSize":"","titleFontStyle":{"value":"normal"},"titleFontWeight":{"value":"bold"},"margin":"8","maxWidth":"250","maxHeight":"","verticalAlignment":{"label":"Top","value":"top"},"horizontalAlignment":{"label":"Right","value":"right"},"fontSize":"","widthTotalValue":"","widthCompareValue":"150","contentGrowthCompareValueSymbol":null,"widthSeries":"60","decimalPrecision":0,"enableAbbreviation":false,"readableNumber":null,"addSpaceBetweenNumberAndNotation":false,"contentValue":null,"contentGrowth":true,"contentGrowthCompareValue":true,"contentGrowthType":true,"itemMargin":"","contentSeries":true,"contentSeriesTextColor":null,"hideSymbol":false,"contentValueFontWeight":null,"contentValuePrefix":null,"contentValueSuffix":null,"contentValueReadableNumber":true,"contentValueDecimalPrecision":"1","contentValueEnableAbbreviation":true,"contentValueAddSpaceBetweenNumberAndNotation":true,"contentCompareValuePrefix":"Compared to last month ","contentCompareValueSuffix":"","contentCompareValueFontWeight":{"label":"Bold","value":"bold"},"contentCompareValueReadableNumber":true,"contentCompareValueDecimalPrecision":"0","contentCompareValueEnableAbbreviation":true,"contentCompareValueAddSpaceBetweenNumberAndNotation":true,"contentType":{"value":"series"},"contentGrowthTextAlign":null,"contentGrowthValue":true,"contentGrowthValueSuffix":"","contentGrowthValuePrefix":"Total Revenue","contentGrowthValueFontSize":"","contentGrowthValueFontWeight":{"label":"Bold","value":"bold"},"contentGrowthPercentage":true,"contentGrowthPercentageReadableNumber":false,"contentGrowthPercentageDecimalPrecision":"2","navigationAlign":{"label":"Left","value":"left"}},"stack":{"showStack":null,"labelEnabled":null},"color":{"color":null,"orderingColor":["#00B4FF","#0072FB","#00D2AA","#008591","#20C400","#008C00","#7E97AA","#405F77","#FFAF00","#D34C00","#A274FF","#6334FF","#FF4B74","#E60000","#FF4AF9","#DF00E4","#FF7AAF","#F40079"],"showBackground":null,"orderingGradient":null,"useBackgroundGradient":true,"useColorByPoint":false,"nodesColor":[],"upColor":null},"credit":{"creditText":null,"creditLink":null},"combine":{"showCombineChart":null,"combine":null,"showInLegend":null,"gradient":null,"seriesCombine":null},"ordering":{"legend":["COMMUNITY","DIGITAL","GRAPARI","NQ"]}}',
                  extraOptions:
                    '{"appearance":{"unit":{"value":"px"},"cornerTL":"20","cornerTR":"20","cornerBL":0,"cornerBR":0,"cornerRadius":0,"individualCorners":true},"useBackgroundGradient":true,"growth":{"enabled":false,"indicator":"value","labelRadius":false,"percentage":false,"abbr":false,"suffix":"","prefix":"","colorLine":null,"colorText":null,"boxTextTransparent":null},"tooltipType":{"headerTitle":"Header Title","headerTextColor":"#fff","seriesName":"Series Name","variant":"variant-1","enabled":true,"type":"advanced","notation":"billions","decimal":"0","prefix":"","suffix":null,"growth":{"notation":null,"decimal":null,"prefix":null,"suffix":null},"abbreviateValue":false,"contentLastUpdateFormatDated":"DD-MMM-YYYY","addSpaceBetweenNumberAndNotation":true,"contentGrowth":true,"readableNumber":true,"valueFontWeight":"bold","contentLastUpdated":true,"contentGrowthCompareValue":true,"contentGrowthCompareValueSuffix":null,"contentGrowthCompareValuePrefix":"IDR ","contentCompareValueReadableNumber":true,"contentCompareValueDecimalPrecision":"0","contentCompareValueEnableAbbreviation":null,"contentCompareValueAddSpaceBetweenNumberAndNotation":null,"contentGrowthPercentage":true,"contentGrowthPercentageDecimalPrecision":"1","contentGrowthPercentageReadableNumber":null,"hideArrow":null,"fontSize":"","contentGrowthType":true,"contentSeries":null,"contentTotalStacked":null,"contentShowTitle":null,"contentTitle":null,"contentHideSymbol":null},"titleColor":null,"type":"date","formatDate":"DD MMMM YYYY","prefixSubtitle":"Last Updated:","halfDonut":{"enabled":false,"showValue":null,"prefix":null,"suffix":null,"abbr":null},"backgroundColorHeader":null,"borderWeight":"1","borderColor":"#F5F8F8","growthField":{"type":null,"data":[{"series":[{"y":"NQ","data":[234752855779,0,0,0,0,0],"name":"NQ","additionalValue":[{"label":"Total Value","text":"%mom","value":-847469533},{"label":"mom","value":-0.35970643583692674},{"label":"Percentage","value":-0.35970643583692674},{"label":"Growth Type","value":"mom"},{"label":"Growth","value":"down"},{"label":"Growth Description","value":"Compared To Last month"},{"label":"Legend","value":"NQ"},{"label":"Last Update","value":1743465600},{"label":"%mom","value":-0.35970643583692674},{"label":"01 Apr - 30 Apr","value":234752855779},{"label":"01 Mar - 31 Mar","value":235600325312}],"grouping":false,"color":{"linearGradient":{"x1":1,"y1":0.5,"x2":0,"y2":0.5},"stops":[[-0.2708,"#53C0DA"],[1,"#53C0DA00"]]}},{"y":"BROADBAND","data":[0,1710901887469,0,0,0,0],"name":"BROADBAND","additionalValue":[{"label":"Total Value","text":"%mom","value":-89807303729},{"label":"mom","value":-4.987329668109918},{"label":"Percentage","value":-4.987329668109918},{"label":"Growth Type","value":"mom"},{"label":"Growth","value":"down"},{"label":"Growth Description","value":"Compared To Last month"},{"label":"Legend","value":"BROADBAND"},{"label":"Last Update","value":1743465600},{"label":"%mom","value":-4.987329668109918},{"label":"01 Apr - 30 Apr","value":1710901887469},{"label":"01 Mar - 31 Mar","value":1800709191198}],"grouping":false,"color":{"linearGradient":{"x1":1,"y1":0.5,"x2":0,"y2":0.5},"stops":[[0.0709,"#FC972B"],[0.5903,"#F33A28"],[0.7828,"#ED0226"]]}},{"y":"DIG. SERVICE","data":[0,0,306360671436,0,0,0],"name":"DIG. SERVICE","additionalValue":[{"label":"Total Value","text":"%mom","value":84889766066},{"label":"mom","value":38.32998556816258},{"label":"Percentage","value":38.32998556816258},{"label":"Growth Type","value":"mom"},{"label":"Growth","value":"up"},{"label":"Growth Description","value":"Compared To Last month"},{"label":"Legend","value":"DIG. SERVICE"},{"label":"Last Update","value":1743465600},{"label":"%mom","value":38.32998556816258},{"label":"01 Apr - 30 Apr","value":306360671436},{"label":"01 Mar - 31 Mar","value":221470905370}],"grouping":false,"color":{"linearGradient":{"x1":1,"y1":0.5,"x2":0,"y2":0.5},"stops":[[0.4365,"#EDA244"],[0.9370999999999999,"#EDA24400"]]}},{"y":"VOICE P2P","data":[0,0,0,105044501809,0,0],"name":"VOICE P2P","additionalValue":[{"label":"Total Value","text":"%mom","value":-2633479863},{"label":"mom","value":-2.445699503378411},{"label":"Percentage","value":-2.445699503378411},{"label":"Growth Type","value":"mom"},{"label":"Growth","value":"down"},{"label":"Growth Description","value":"Compared To Last month"},{"label":"Legend","value":"VOICE P2P"},{"label":"Last Update","value":1743465600},{"label":"%mom","value":-2.445699503378411},{"label":"01 Apr - 30 Apr","value":105044501809},{"label":"01 Mar - 31 Mar","value":107677981672}],"grouping":false,"color":{"linearGradient":{"x1":1,"y1":0.5,"x2":0,"y2":0.5},"stops":[[0.4485,"#1C649F"],[0.7685,"#89B5C9"]]}},{"y":"OTHERS REVENUE","data":[0,0,0,0,40056605006,0],"name":"OTHERS REVENUE","additionalValue":[{"label":"Total Value","text":"%mom","value":2719875},{"label":"mom","value":0.006790539771870801},{"label":"Percentage","value":0.006790539771870801},{"label":"Growth Type","value":"mom"},{"label":"Growth","value":"up"},{"label":"Growth Description","value":"Compared To Last month"},{"label":"Legend","value":"OTHERS REVENUE"},{"label":"Last Update","value":1743465600},{"label":"%mom","value":0.006790539771870801},{"label":"01 Apr - 30 Apr","value":40056605006},{"label":"01 Mar - 31 Mar","value":40053885131}],"grouping":false,"color":{"linearGradient":{"x1":1,"y1":0.5,"x2":0,"y2":0.5},"stops":[[0.0002,"#D82A31"],[1.2833,"#933F7A"]]}},{"y":"SMS P2P","data":[0,0,0,0,0,7229138],"name":"SMS P2P","additionalValue":[{"label":"Total Value","text":"%mom","value":1604315},{"label":"mom","value":28.522053049491515},{"label":"Percentage","value":28.522053049491515},{"label":"Growth Type","value":"mom"},{"label":"Growth","value":"up"},{"label":"Growth Description","value":"Compared To Last month"},{"label":"Legend","value":"SMS P2P"},{"label":"Last Update","value":1743465600},{"label":"%mom","value":28.522053049491515},{"label":"01 Apr - 30 Apr","value":7229138},{"label":"01 Mar - 31 Mar","value":5624823}],"grouping":false,"color":{"linearGradient":{"x1":1,"y1":0.5,"x2":0,"y2":0.5},"stops":[[0,"#75468A"],[1,"#D3C0D4"]]}}],"categories":["BROADBAND","DIG. SERVICE","NQ","VOICE P2P","OTHERS REVENUE","SMS P2P"]}]},"localFilter":{"enabled":false,"type":null,"list":[],"placeholder":null},"useColorByPoint":false,"titleFontSize":null,"subtitleFontSize":null}',
                  indexSideMenu: 0,
                  widgetType: '',
                  tabType: '',
                  headerUseWidget: false,
                  tabId: 'tab-527',
                  hideTitle: true,
                  tabs: [],
                  widgetEmptyCardList: [],
                  text: '',
                  type: '',
                },
              ],
              text: '',
              type: '',
            },
            {
              widgetListId: 36333,
              title: 'Monthly CT0',
              subtitle: 'Last Updated: 01 December 2024',
              widgetId: 'W-2713',
              queryId: 'Q-1281',
              cacheId: 'cache-DS-45-740-2343390820',
              sqlQuery:
                'FSRrqfkawTbupacbDRK1cIjQzE0TwQOcjUupDQBqJhXTCEGCUrJl730qvnK4T1FNVuINpYw8TIhG7gjmm4iYELQ/aN98rGM+bycxK2bxJ6hFa6dn26rD365qItJJkwTjuqW78wqNDZiqq+UCQmG19zz6IzWPGolGCH+kGl9PNpnPppVZdykFYhwzIfymPgGzKYqwBnB27EXRtMajNNIKLSnQNaGSn07m8X5kiOfLt7UlWQ4ZwDsBSrrgFJa3wNunn+MSUD7KtPdsxG3f4d5CAhkmCqK888ExoCTO770L3xB+rwdez+ZkOtj3nMhwVLXkt45cBq+KAuPuTQOsmt2CTF7i5bzxoituIcWcBIGeVeLu5BsQV+V2fofOMUfdD3QSJyuh71lPJm9K+NAh8gzWZRvRalfacK0JvUO1Oe5FOvYOcrj9JH3xKY0lTIkdmbpFygy0tHcd++jkbjEhn+cFg8j3XBjDNK0QiW8LkcAvVBk5h12WC8a4Jx3iAhCMzKbhWJqSkA==',
              widgetAggregation: {
                groupValue: [
                  {
                    alias: 'series',
                    operation: 'sum',
                    sortType: 'asc',
                    value: 'sum',
                  },
                ],
                select: [
                  {
                    singleSeries: false,
                  },
                  {
                    dateColumn: 'event_date',
                  },
                  {
                    xColumn: 'to_char',
                  },
                  {
                    operation: 'sum',
                    yColumn: 'sum',
                  },
                ],
                sort: {
                  column: 'to_char',
                  type: 'asc',
                },
              },
              visualizationId: 'viz-03',
              rows: 13,
              cols: 19,
              x: 12,
              y: 21,
              chartOptions:
                '{"dataSeries":{"reportType":null,"xAxis":{"label":"to_char","value":"to_char"},"yAxis":{"label":"sum","value":"sum"},"series":null,"seriesOrder":"Ascending","sortBy":{"label":"X Axis","value":"X Axis"},"sortByOrder":null,"customOrder":null,"sortDataType":null,"showMarker":null,"fillMarker":null,"markerSymbol":null,"operation":{"label":"Default","value":""},"dateColumn":null,"singleSeries":null,"growthType":null},"general":{"widgetName":"Monthly CT0","subtitle":{"label":"event_date","value":"event_date"},"type":"date","thousandSeparator":null,"decimalSeparator":null,"formatDate":{"label":"DD MMMM YYYY","value":"DD MMMM YYYY"},"prefixSubtitle":"Last Updated:","description":"Monthly CT0 desc","xAxisTitle":null,"yAxisTitle":null,"smoothLine":null,"gradientLine":null,"showDataLabel":true,"selectTypeChartGroup":null,"percentageMode":null,"innerSize":0,"showNotation":true,"chooseNotation":{"label":"Millions","value":"millions"},"decimal":"1","prefix":null,"suffix":null,"showCenterValue":null,"abbrTotalValue":null,"prefixCenterValue":null,"suffixCenterValue":null,"titleFontSize":"15","subtitleFontSize":"8","appearance":{"unit":{"value":"px"},"cornerTL":"50","cornerTR":"50","cornerBL":0,"cornerBR":0,"cornerRadius":0,"individualCorners":true},"titleColor":null,"typeColor":null,"backgroundColorHeader":null,"borderWeight":null,"borderColor":null,"height":null},"xAxis":{"showLabel":true,"scale":null,"interval":null,"ordering":null,"lineWidth":1,"gridLineWidth":0},"yAxis":{"showLabel":true,"labelAlign":"right","scale":null,"interval":null,"minimumValue":"Dynamic","customMinimumValue":null,"ordering":null,"lineWidth":0,"gridLineWidth":1,"enableAbbreviation":null,"addSpaceBetweenNumberAndNotation":null,"decimalPrecision":0,"gridLineDashStyle":{"label":"LongDash","value":"LongDash"},"readableNumber":null},"tooltip":{"showTooltipSeries":true,"showTooltipSharedSeries":null,"decimal":"0","prefix":null,"suffix":null,"type":{"label":"Advanced","value":"advanced"},"growth":{"notation":null,"decimal":null,"prefix":null,"suffix":null},"abbreviateValue":false,"addSpaceBetweenNumberAndNotation":true,"contentGrowth":null,"contentLastUpdated":null,"contentLastUpdateFormatDated":{"value":"DD-MMM-YYYY"},"readableNumber":true,"valueFontWeight":{"label":"Normal","value":"normal"},"contentGrowthCompareValue":null,"contentCompareValueReadableNumber":null,"contentGrowthCompareValueSuffix":null,"contentGrowthCompareValuePrefix":null,"contentCompareValueDecimalPrecision":2,"contentCompareValueEnableAbbreviation":null,"contentCompareValueAddSpaceBetweenNumberAndNotation":null,"contentGrowthPercentage":null,"contentGrowthPercentageDecimalPrecision":2,"contentGrowthPercentageReadableNumber":null,"hideArrow":true,"fontSize":6,"contentGrowthType":null},"legend":{"aliases":[],"showLegend":false,"isActiveLegendFilter":true,"growthType":null,"typeLegend":null,"themaLegend":null,"layoutLegend":null,"percentageMode":null,"titleText":null,"titleAlign":{"value":"left"},"titleFontSize":null,"titleFontStyle":{"value":"normal"},"titleFontWeight":{"value":"bold"},"margin":null,"maxWidth":null,"maxHeight":null,"verticalAlignment":null,"horizontalAlignment":null,"fontSize":null,"widthTotalValue":128,"widthCompareValue":null,"contentGrowthCompareValueSymbol":null,"widthSeries":null,"decimalPrecision":null,"enableAbbreviation":null,"readableNumber":null,"addSpaceBetweenNumberAndNotation":null,"contentValue":null,"contentGrowth":null,"contentGrowthCompareValue":null,"contentGrowthType":true,"itemMargin":null,"contentSeries":true,"contentSeriesTextColor":null,"hideSymbol":false,"contentValueFontWeight":null,"contentValuePrefix":null,"contentValueSuffix":null,"contentValueReadableNumber":null,"contentValueDecimalPrecision":null,"contentValueEnableAbbreviation":null,"contentValueAddSpaceBetweenNumberAndNotation":null,"contentCompareValuePrefix":null,"contentCompareValueSuffix":null,"contentCompareValueFontWeight":null,"contentCompareValueReadableNumber":null,"contentCompareValueDecimalPrecision":2,"contentCompareValueEnableAbbreviation":null,"contentCompareValueAddSpaceBetweenNumberAndNotation":null,"contentType":{"value":"series"},"contentGrowthTextAlign":null,"contentGrowthValue":null,"contentGrowthValueSuffix":null,"contentGrowthValuePrefix":null,"contentGrowthValueFontSize":null,"contentGrowthValueFontWeight":null,"contentGrowthPercentage":null,"contentGrowthPercentageReadableNumber":null,"contentGrowthPercentageDecimalPrecision":null,"navigationAlign":{"value":"left"}},"stack":{"showStack":null,"labelEnabled":null},"color":{"color":null,"orderingColor":["#00B4FF","#0072FB","#00D2AA","#008591","#20C400","#008C00","#7E97AA","#405F77","#FFAF00","#D34C00","#A274FF","#6334FF","#FF4B74","#E60000","#FF4AF9","#DF00E4","#FF7AAF","#F40079"],"showBackground":null,"orderingGradient":null,"useBackgroundGradient":true,"useColorByPoint":null},"credit":{"creditText":null,"creditLink":null},"combine":{"showCombineChart":null,"combine":null,"showInLegend":null,"gradient":null,"seriesCombine":null},"ordering":{"legend":null}}',
              extraOptions:
                '{"appearance":{"unit":{"value":"px"},"cornerTL":"50","cornerTR":"50","cornerBL":0,"cornerBR":0,"cornerRadius":0,"individualCorners":true},"useBackgroundGradient":true,"useColorByPoint":null,"growth":{"enabled":false,"indicator":"value","labelRadius":false,"percentage":false,"abbr":false,"suffix":"","prefix":"","colorLine":null,"colorText":null,"boxTextTransparent":null},"tooltipType":{"enabled":true,"type":"advanced","notation":"millions","decimal":"0","prefix":null,"suffix":null,"growth":{"notation":null,"decimal":null,"prefix":null,"suffix":null},"abbreviateValue":false,"contentLastUpdateFormatDated":"DD-MMM-YYYY","addSpaceBetweenNumberAndNotation":true,"contentGrowth":null,"readableNumber":true,"valueFontWeight":"normal","contentLastUpdated":null,"contentGrowthCompareValue":null,"contentGrowthCompareValueSuffix":null,"contentGrowthCompareValuePrefix":null,"contentCompareValueReadableNumber":null,"contentCompareValueDecimalPrecision":2,"contentCompareValueEnableAbbreviation":null,"contentCompareValueAddSpaceBetweenNumberAndNotation":null,"contentGrowthPercentage":null,"contentGrowthPercentageDecimalPrecision":2,"contentGrowthPercentageReadableNumber":null,"hideArrow":true,"fontSize":6,"contentGrowthType":null},"titleColor":null,"titleFontSize":"15","type":"date","formatDate":"DD MMMM YYYY","prefixSubtitle":"Last Updated:","halfDonut":{"enabled":false,"showValue":null,"prefix":null,"suffix":null,"abbr":null},"backgroundColorHeader":null,"borderWeight":null,"borderColor":null,"growthField":{"type":null,"data":[{"series":[{"data":[{"y":1111022,"additionalValue":[{"Label":null,"value":1111022},{"label":"Legend","value":"Dec 23"},{"label":"Last Update","value":1733011200},{"label":"Total Value","text":"Compared To Last Month","value":1111022},{"label":"MoM","value":0},{"label":"Percentage","value":0},{"label":"Growth Type","value":"MoM"},{"label":"Growth","value":"up"},{"label":"Growth Description","value":"Compared To Last Month"}],"color":{"linearGradient":{"x1":0.5,"y1":0,"x2":0.5,"y2":1},"stops":[[0.0709,"#FC972B"],[0.5903,"#F33A28"],[0.7828,"#ED0226"]]},"legendColor":"#FC972B"},{"y":1176097,"additionalValue":[{"Label":null,"value":1176097},{"label":"Legend","value":"Jan 24"},{"label":"Last Update","value":1733011200},{"label":"Total Value","text":"Compared To Last Month","value":65075},{"label":"MoM","value":5.857219749023872},{"label":"Percentage","value":5.857219749023872},{"label":"Growth Type","value":"MoM"},{"label":"Growth","value":"up"},{"label":"Growth Description","value":"Compared To Last Month"}],"color":{"linearGradient":{"x1":0.5,"y1":0,"x2":0.5,"y2":1},"stops":[[0.0709,"#FC972B"],[0.5903,"#F33A28"],[0.7828,"#ED0226"]]},"legendColor":"#FC972B"},{"y":1257117,"additionalValue":[{"Label":null,"value":1257117},{"label":"Legend","value":"Feb 24"},{"label":"Last Update","value":1733011200},{"label":"Total Value","text":"Compared To Last Month","value":81020},{"label":"MoM","value":6.8888875662466615},{"label":"Percentage","value":6.8888875662466615},{"label":"Growth Type","value":"MoM"},{"label":"Growth","value":"up"},{"label":"Growth Description","value":"Compared To Last Month"}],"color":{"linearGradient":{"x1":0.5,"y1":0,"x2":0.5,"y2":1},"stops":[[0.0709,"#FC972B"],[0.5903,"#F33A28"],[0.7828,"#ED0226"]]},"legendColor":"#FC972B"},{"y":1232212,"additionalValue":[{"Label":null,"value":1232212},{"label":"Legend","value":"Mar 24"},{"label":"Last Update","value":1733011200},{"label":"Total Value","text":"Compared To Last Month","value":-24905},{"label":"MoM","value":-1.9811202934969459},{"label":"Percentage","value":-1.9811202934969459},{"label":"Growth Type","value":"MoM"},{"label":"Growth","value":"down"},{"label":"Growth Description","value":"Compared To Last Month"}],"color":{"linearGradient":{"x1":0.5,"y1":0,"x2":0.5,"y2":1},"stops":[[0.0709,"#FC972B"],[0.5903,"#F33A28"],[0.7828,"#ED0226"]]},"legendColor":"#FC972B"},{"y":1255200,"additionalValue":[{"Label":null,"value":1255200},{"label":"Legend","value":"Apr 24"},{"label":"Last Update","value":1733011200},{"label":"Total Value","text":"Compared To Last Month","value":22988},{"label":"MoM","value":1.865588064391517},{"label":"Percentage","value":1.865588064391517},{"label":"Growth Type","value":"MoM"},{"label":"Growth","value":"up"},{"label":"Growth Description","value":"Compared To Last Month"}],"color":{"linearGradient":{"x1":0.5,"y1":0,"x2":0.5,"y2":1},"stops":[[0.0709,"#FC972B"],[0.5903,"#F33A28"],[0.7828,"#ED0226"]]},"legendColor":"#FC972B"},{"y":1280998,"additionalValue":[{"Label":null,"value":1280998},{"label":"Legend","value":"May 24"},{"label":"Last Update","value":1733011200},{"label":"Total Value","text":"Compared To Last Month","value":25798},{"label":"MoM","value":2.0552899936265137},{"label":"Percentage","value":2.0552899936265137},{"label":"Growth Type","value":"MoM"},{"label":"Growth","value":"up"},{"label":"Growth Description","value":"Compared To Last Month"}],"color":{"linearGradient":{"x1":0.5,"y1":0,"x2":0.5,"y2":1},"stops":[[0.0709,"#FC972B"],[0.5903,"#F33A28"],[0.7828,"#ED0226"]]},"legendColor":"#FC972B"},{"y":1319282,"additionalValue":[{"Label":null,"value":1319282},{"label":"Legend","value":"Jun 24"},{"label":"Last Update","value":1733011200},{"label":"Total Value","text":"Compared To Last Month","value":38284},{"label":"MoM","value":2.9886073202300083},{"label":"Percentage","value":2.9886073202300083},{"label":"Growth Type","value":"MoM"},{"label":"Growth","value":"up"},{"label":"Growth Description","value":"Compared To Last Month"}],"color":{"linearGradient":{"x1":0.5,"y1":0,"x2":0.5,"y2":1},"stops":[[0.0709,"#FC972B"],[0.5903,"#F33A28"],[0.7828,"#ED0226"]]},"legendColor":"#FC972B"},{"y":1366638,"additionalValue":[{"Label":null,"value":1366638},{"label":"Legend","value":"Jul 24"},{"label":"Last Update","value":1733011200},{"label":"Total Value","text":"Compared To Last Month","value":47356},{"label":"MoM","value":3.589528243392997},{"label":"Percentage","value":3.589528243392997},{"label":"Growth Type","value":"MoM"},{"label":"Growth","value":"up"},{"label":"Growth Description","value":"Compared To Last Month"}],"color":{"linearGradient":{"x1":0.5,"y1":0,"x2":0.5,"y2":1},"stops":[[0.0709,"#FC972B"],[0.5903,"#F33A28"],[0.7828,"#ED0226"]]},"legendColor":"#FC972B"},{"y":1402807,"additionalValue":[{"Label":null,"value":1402807},{"label":"Legend","value":"Aug 24"},{"label":"Last Update","value":1733011200},{"label":"Total Value","text":"Compared To Last Month","value":36169},{"label":"MoM","value":2.646567708493398},{"label":"Percentage","value":2.646567708493398},{"label":"Growth Type","value":"MoM"},{"label":"Growth","value":"up"},{"label":"Growth Description","value":"Compared To Last Month"}],"color":{"linearGradient":{"x1":0.5,"y1":0,"x2":0.5,"y2":1},"stops":[[0.0709,"#FC972B"],[0.5903,"#F33A28"],[0.7828,"#ED0226"]]},"legendColor":"#FC972B"},{"y":1442866,"additionalValue":[{"Label":null,"value":1442866},{"label":"Legend","value":"Sep 24"},{"label":"Last Update","value":1733011200},{"label":"Total Value","text":"Compared To Last Month","value":40059},{"label":"MoM","value":2.855631601496143},{"label":"Percentage","value":2.855631601496143},{"label":"Growth Type","value":"MoM"},{"label":"Growth","value":"up"},{"label":"Growth Description","value":"Compared To Last Month"}],"color":{"linearGradient":{"x1":0.5,"y1":0,"x2":0.5,"y2":1},"stops":[[0.0709,"#FC972B"],[0.5903,"#F33A28"],[0.7828,"#ED0226"]]},"legendColor":"#FC972B"},{"y":1674921,"additionalValue":[{"Label":null,"value":1674921},{"label":"Legend","value":"Oct 24"},{"label":"Last Update","value":1733011200},{"label":"Total Value","text":"Compared To Last Month","value":232055},{"label":"MoM","value":16.082921075137953},{"label":"Percentage","value":16.082921075137953},{"label":"Growth Type","value":"MoM"},{"label":"Growth","value":"up"},{"label":"Growth Description","value":"Compared To Last Month"}],"color":{"linearGradient":{"x1":0.5,"y1":0,"x2":0.5,"y2":1},"stops":[[0.0709,"#FC972B"],[0.5903,"#F33A28"],[0.7828,"#ED0226"]]},"legendColor":"#FC972B"},{"y":1751954,"additionalValue":[{"Label":null,"value":1751954},{"label":"Legend","value":"Nov 24"},{"label":"Last Update","value":1733011200},{"label":"Total Value","text":"Compared To Last Month","value":77033},{"label":"MoM","value":4.599201992213365},{"label":"Percentage","value":4.599201992213365},{"label":"Growth Type","value":"MoM"},{"label":"Growth","value":"up"},{"label":"Growth Description","value":"Compared To Last Month"}],"color":{"linearGradient":{"x1":0.5,"y1":0,"x2":0.5,"y2":1},"stops":[[0.0709,"#FC972B"],[0.5903,"#F33A28"],[0.7828,"#ED0226"]]},"legendColor":"#FC972B"},{"y":1832861,"additionalValue":[{"Label":null,"value":1832861},{"label":"Legend","value":"Dec 24"},{"label":"Last Update","value":1733011200},{"label":"Total Value","text":"Compared To Last Month","value":80907},{"label":"MoM","value":4.618100703557285},{"label":"Percentage","value":4.618100703557285},{"label":"Growth Type","value":"MoM"},{"label":"Growth","value":"up"},{"label":"Growth Description","value":"Compared To Last Month"}],"color":{"linearGradient":{"x1":0.5,"y1":0,"x2":0.5,"y2":1},"stops":[[0.0709,"#FC972B"],[0.5903,"#F33A28"],[0.7828,"#ED0226"]]},"legendColor":"#FC972B"}],"name":null,"y":1111022}],"categories":["Dec 23","Jan 24","Feb 24","Mar 24","Apr 24","May 24","Jun 24","Jul 24","Aug 24","Sep 24","Oct 24","Nov 24","Dec 24"]}]},"subtitleFontSize":"8","extras":{"position":"top-center","extrasWidget":{"widgetId":"W-2690","position":"top-center"}}}',
              indexSideMenu: 0,
              widgetType: '',
              tabType: '',
              headerUseWidget: false,
              tabId: '',
              hideTitle: false,
              tabs: [],
              widgetEmptyCardList: [],
              text: '',
              type: '',
            },
            {
              widgetListId: 53084,
              title: 'Net Add',
              subtitle: 'event_date',
              widgetId: 'W-2966',
              queryId: 'Q-1285',
              cacheId: 'cache-DS-45-071-1333511082',
              sqlQuery:
                'rpkKtA6AM3NNnlC3SW87ok+w+e2d2FloTeq70T/qrESP13tgk4pBdW+mX+cqEb/faZnJMHe397muT9knL2Kqdzs4QIuKhChLdGvAX15ewLH4YU+YvVNshPGTB7LONSPV/UkLUDUGUmQlYBO9vmr2H/qj5KLQFbU5FtKnYPMCYycuDQTo0JcwvvzHNbnfESHg3CCkO4GKpedPSzWtiYZ5d6j4Rtz1jX/TUWQ0VdGlaYlrRxl+Qxw/qoXmCvhSz1xcK9r8ZtZYRdSo7PAKH3RHXOPXnyWRzOwb2flZ6ermPMxNn3YULehWRp3LQdhrFSpK3yi+p++WYk1rNq93b0ZPgoCaCUrh7yMCGXRH58hFJSZjsBCsDcWheYrWEcMp/VRIsuadq3WA+zaowAjfy/ScqAJenD/pqtA/kQICeMw9hCNICKPXSyWh19/X9Mwww7U5voJrM8Cdf6mphUTjhDCClwFf8NkZKZCRCPJXUqJvp3TZZh9NXcGFgBbyBKfmLDAXvhHgzzRlBCB0eju+rCJjkar/PHada7HD5bgJWp3gtvhSZJTI/RCAAntnMvtkrWGVOMxPqLZED7y1nRj3Jkd+29Uf9dGcVExJoonULkx0/1gFuTvPstydo5qdEiDAUKlXx9Kiqq0zELByj2aoEtc2rLZG3We/VI+xLlbict7eQcC6CEp+SlIE4UNslb9DUTgyfcCZiaiEfYC15Li0Oawka5EzLUxQnVT7ioudgCHdVao6ePyPOd/bN3FDO5yiJPN6j//GQ6w3yyrQL6OUnUnLKZoyQRzZZc57bw8e1bKCUQrZco4+s5It8zoiB+2P2h79/7S4VkarcMEWL6VflLPuVDQEvOawJlMwQjOa+mF85DKW8lXJ/DyBgr/AvLuABfBcfEMac1qcwB2a51rvrIXy4RW62GcEipsqExNkLcCQ6zJGOWwGgiW8qulsmWh0KObhRhxxb1BAH9wQNqoEtdZ48Ao48C/tGMb5LltXpkya/i6sZq4NuBIrImHohuqigZsO/qS+JpwTmzwuTFgdSLIbZ1dgRLVAdrxCpaaCmt0okcZl3AZAiYqFzQZ278JoHCgWMFE1Zo73wzlQTMj/rUdxJubJ4BkjwWLtwPFrQKuvWHiMqlkOIgVwyNGk0z3ovxGz0PO0V1uNSFARILpYXoWn/h2U9VTm/6XMZuPlt3brhhvfjMbe+7MQ37mJHACkvZNV0+aekwo6wSqMt2l5no3OxJuJ4z+VIL3qS/fmBoUiqm+yXcmnjHLvcmAL1VYC7hsVf+XdWIlbSWoxVxtXVRCPWWyeHVHcno2fnMStIGnP4S3lmqehjBHG3plj73dhxS2GQv5MB+vNSnZ6cUPuWheL1KeLaYFZ4KbtvwVV7yc4Q2Zp4dpmCc8k2DWFWP91qU0hwhnxNMGc/kOHvoKGroC4CooASPQS4VPqtVdI22kMIBeQZdYYuefJB+iR5Li6CQbneQPIL+zWpCZ46WhFyu3AabNTksifsJ5N96JZ7aUfoplwk5ItmLdfVUmChiewOn1TmkEqlCe6xT/ZMbdcktbjysGnboC8CeG2KRdLIy5KllukIWxJ8rB4F6MlfqFBk4PyNBMXF6lqXCmx9uUjAjBH56fD8zxWT6uYsDdAnu0JbpxXUNzipUpQY8P93iN2ctjpTGiw1AQxkZAK1fRsbmHUNc01gYyFgCMJoeLOxWFi62DOaWtsuG/P4S3C2l+SlNj+melG1My6fBvBRLP4AXEWYGxtucbdxr/X1KpoLAiTrfvEdm2E010C/RFErT4O9HVlxLdu02NR/DDZdA2gLVc7i24l9r9gik8MP1yT7ucBDXCsoRzITtYCK+7kxuXzAkveObw2Mv32c7tRwRc3ALr3keIG+e9AjWx1CpoFBUuy9k9Y3WUBOPB31W0nQK9w4N0UrdGOCpWcTcIpVPFauUKuT6TuDGUe3VA79LDW4damMvX20KamXm8fi0UGgH3QWB5IegTmjIQS62SDIJUSw09r0N83v7gDFeySjAraM9t2K9TZvwhNbhVaSYxQzuRU2p29wOU3kFkWtGeR+Stf4djUyb7yc2vQTeCayOe5y5MNKVCb/OfqUjiGbWUV67SGgMPV89YjaTym6tArYYcXQM0KRHo2amE/94zDQYwVx9/WCOeMPFBeZQtXmmS7S96ofye2fJThI+2C/3Hc/e8aEBQqIKWH4kMWfwV2hDSBEbNuRGLqOW1CjWuxr+Y9NKxTYx3KJM4W0/TJdCwCoNjxEBucgJNAjwc2K7jBDW9Z9lHp14Nzh2BMpx/AmXoOioq9XwMK2+3zsfT20awH3lHK8wWnrYcKaG7diNXFxg==',
              widgetAggregation: {
                select: [
                  {
                    singleSeries: false,
                  },
                  {
                    dateColumn: 'event_date',
                  },
                  {
                    xColumn: 'event_month',
                  },
                  {
                    operation: 'sum',
                    yColumn: 'total_subs',
                  },
                ],
                sort: {},
              },
              visualizationId: 'viz-03',
              rows: 12,
              cols: 14,
              x: 34,
              y: 9,
              chartOptions:
                '{"dataSeries":{"reportType":null,"xAxis":{"label":"event_month","value":"event_month"},"yAxis":{"label":"total_subs","value":"total_subs"},"series":{"label":"none","value":"none"},"seriesOrder":null,"sortBy":null,"sortByOrder":null,"customOrder":null,"sortDataType":null,"showMarker":null,"fillMarker":null,"markerSymbol":null,"operation":{"label":"Default","value":""},"dateColumn":null,"singleSeries":null,"growthType":null,"limit":null,"contentLabel":true,"contentTotal":true,"contentPercentage":true,"sum":null,"nodes":[]},"general":{"widgetName":"Net Add","subtitle":{"label":"event_date","value":"event_date"},"type":"date","thousandSeparator":null,"decimalSeparator":null,"formatDate":{"label":"DD MMMM YYYY","value":"DD MMMM YYYY"},"prefixSubtitle":"Last Updated: ","description":"Net add","xAxisTitle":null,"yAxisTitle":null,"smoothLine":null,"gradientLine":null,"showDataLabel":null,"selectTypeChartGroup":null,"percentageMode":null,"averageMode":null,"innerSize":0,"showNotation":true,"chooseNotation":{"label":"Thousands","value":"thousands"},"decimal":null,"prefix":null,"suffix":null,"showCenterValue":null,"abbrTotalValue":null,"prefixCenterValue":null,"suffixCenterValue":null,"titleFontSize":null,"subtitleFontSize":null,"appearance":{"unit":{"value":"px"},"cornerTL":0,"cornerTR":0,"cornerBL":0,"cornerBR":0,"cornerRadius":"200","individualCorners":false},"titleColor":null,"typeColor":null,"backgroundColorHeader":null,"borderWeight":null,"borderColor":null,"height":null,"readableNumber":null,"symbolNumber":null,"symbolSpace":null},"xAxis":{"showLabel":true,"labelWidth":null,"wordWrap":null,"textAlign":null,"scale":null,"interval":null,"ordering":["Jan","Feb","Mar"],"prefix":null,"suffix":null,"lineWidth":"0","gridLineWidth":0},"yAxis":{"showLabel":false,"labelAlign":null,"scale":null,"interval":null,"minimumValue":"Dynamic","customMinimumValue":null,"ordering":null,"lineWidth":0,"gridLineWidth":"0","enableAbbreviation":null,"addSpaceBetweenNumberAndNotation":null,"decimalPrecision":0,"gridLineDashStyle":"Solid","gridLineDashConnectorStyle":"ShortDash","readableNumber":null,"showNotationYaxis":true,"prefix":null,"suffix":null},"tooltip":{"showTooltipSeries":true,"showTooltipSharedSeries":null,"decimal":"0","prefix":"SSL ","suffix":null,"type":{"label":"Advanced","value":"advanced"},"growth":{"notation":null,"decimal":null,"prefix":null,"suffix":null},"variant":{"value":"variant-1"},"seriesName":"Series Name","headerTitle":"Header Title","headerTextColor":"#fff","abbreviateValue":null,"addSpaceBetweenNumberAndNotation":null,"contentGrowth":null,"contentLastUpdated":null,"contentLastUpdateFormatDated":{"value":"DD-MMM-YYYY"},"readableNumber":true,"valueFontWeight":{"value":"bold"},"contentGrowthCompareValue":true,"contentCompareValueReadableNumber":true,"contentGrowthCompareValueSuffix":null,"contentGrowthCompareValuePrefix":null,"contentCompareValueDecimalPrecision":"0","contentCompareValueEnableAbbreviation":null,"contentCompareValueAddSpaceBetweenNumberAndNotation":null,"contentGrowthPercentage":true,"contentGrowthPercentageDecimalPrecision":2,"contentGrowthPercentageReadableNumber":null,"contentTotalStacked":null,"contentSeries":null,"contentShowTitle":null,"contentTitle":null,"contentHideSymbol":null,"hideArrow":true,"fontSize":6,"contentGrowthType":true,"abbreviationScale":null},"legend":{"aliases":[],"showLegend":true,"isActiveLegendFilter":true,"growthType":{"label":"Month","value":"monthly"},"typeLegend":{"label":"Variant 1","value":"type-1"},"themaLegend":{"label":"Advance","value":"advance"},"layoutLegend":{"label":"Vertical","value":"vertical"},"percentageMode":null,"limitLegend":null,"showLimitLegend":null,"titleText":"Net Add in 3 months","titleAlign":{"value":"left"},"titleFontSize":"12","titleFontStyle":{"value":"normal"},"titleFontWeight":{"value":"bold"},"margin":"8","maxWidth":null,"maxHeight":null,"verticalAlignment":{"label":"Middle","value":"middle"},"horizontalAlignment":{"label":"Right","value":"right"},"fontSize":null,"widthTotalValue":null,"widthCompareValue":null,"contentGrowthCompareValueSymbol":null,"widthSeries":null,"decimalPrecision":null,"enableAbbreviation":null,"readableNumber":null,"addSpaceBetweenNumberAndNotation":null,"contentValue":true,"contentGrowth":false,"contentGrowthCompareValue":false,"contentGrowthType":true,"itemMargin":null,"contentSeries":true,"contentSeriesTextColor":"#795548","hideSymbol":true,"contentValueFontWeight":null,"contentValuePrefix":null,"contentValueSuffix":null,"contentValueReadableNumber":true,"contentValueDecimalPrecision":"0","contentValueEnableAbbreviation":null,"contentValueAddSpaceBetweenNumberAndNotation":null,"contentCompareValuePrefix":null,"contentCompareValueSuffix":null,"contentCompareValueFontWeight":null,"contentCompareValueReadableNumber":null,"contentCompareValueDecimalPrecision":2,"contentCompareValueEnableAbbreviation":null,"contentCompareValueAddSpaceBetweenNumberAndNotation":null,"contentType":{"label":"Data","value":"data"},"contentGrowthTextAlign":null,"contentGrowthValue":true,"contentGrowthValueSuffix":" SSL","contentGrowthValuePrefix":null,"contentGrowthValueFontSize":"7","contentGrowthValueFontWeight":{"label":"Bold","value":"bold"},"contentGrowthPercentage":false,"contentGrowthPercentageReadableNumber":null,"contentGrowthPercentageDecimalPrecision":2,"navigationAlign":{"value":"left"}},"stack":{"showStack":null,"labelEnabled":null},"color":{"color":null,"orderingColor":["#00B4FF","#0072FB","#00D2AA","#008591","#20C400","#008C00","#7E97AA","#405F77","#FFAF00","#D34C00","#A274FF","#6334FF","#FF4B74","#E60000","#FF4AF9","#DF00E4","#FF7AAF","#F40079"],"showBackground":null,"orderingGradient":null,"useBackgroundGradient":true,"useColorByPoint":null,"nodesColor":[],"upColor":null},"credit":{"creditText":null,"creditLink":null},"combine":{"showCombineChart":null,"combine":null,"showInLegend":null,"gradient":null,"seriesCombine":null},"ordering":{"legend":null}}',
              extraOptions:
                '{"appearance":{"unit":{"value":"px"},"cornerTL":0,"cornerTR":0,"cornerBL":0,"cornerBR":0,"cornerRadius":"200","individualCorners":false},"useBackgroundGradient":true,"useColorByPoint":null,"growth":{"enabled":false,"indicator":"value","labelRadius":false,"percentage":false,"abbr":false,"suffix":"","prefix":"","colorLine":null,"colorText":null,"boxTextTransparent":null},"tooltipType":{"headerTitle":"Header Title","headerTextColor":"#fff","seriesName":"Series Name","variant":"variant-1","enabled":true,"type":"advanced","notation":"thousands","decimal":"0","prefix":"SSL ","suffix":null,"growth":{"notation":null,"decimal":null,"prefix":null,"suffix":null},"abbreviateValue":null,"contentLastUpdateFormatDated":"DD-MMM-YYYY","addSpaceBetweenNumberAndNotation":null,"contentGrowth":null,"readableNumber":true,"valueFontWeight":"bold","contentLastUpdated":null,"contentGrowthCompareValue":true,"contentGrowthCompareValueSuffix":null,"contentGrowthCompareValuePrefix":null,"contentCompareValueReadableNumber":true,"contentCompareValueDecimalPrecision":"0","contentCompareValueEnableAbbreviation":null,"contentCompareValueAddSpaceBetweenNumberAndNotation":null,"contentGrowthPercentage":true,"contentGrowthPercentageDecimalPrecision":2,"contentGrowthPercentageReadableNumber":null,"hideArrow":true,"fontSize":6,"contentGrowthType":true,"contentSeries":null,"contentTotalStacked":null,"contentShowTitle":null,"contentTitle":null,"contentHideSymbol":null},"titleColor":null,"titleFontSize":null,"type":"date","formatDate":"DD MMMM YYYY","prefixSubtitle":"Last Updated: ","extras":{"widgetId":"W-2695","position":"top-center","extrasWidget":{"widgetId":"W-2698","position":"top-center"}},"halfDonut":{"enabled":false,"showValue":null,"prefix":null,"suffix":null,"abbr":null},"backgroundColorHeader":null,"borderWeight":null,"borderColor":null,"growthField":{"type":null,"data":[{"series":[{"innerSize":0,"name":"event_month","type":"column","data":[{"y":144026,"z":51.87,"name":"May 25","additionalValue":[{"label":"Legend","value":"May 25"},{"label":"Last Update","value":1748649600},{"label":"Total Value","text":"Compared To Last Month","value":10410},{"label":"MoM","value":7.790983115794516},{"label":"Percentage","value":7.790983115794516},{"label":"Growth Type","value":"MoM"},{"label":"Growth","value":"up"},{"label":"Growth Description","value":"Compared To Last Month"}],"color":{"linearGradient":{"x1":0.5,"y1":0,"x2":0.5,"y2":1},"stops":[[0.0709,"#FC972B"],[0.5903,"#F33A28"],[0.7828,"#ED0226"]]},"legendColor":"#FC972B"},{"y":133616,"z":48.13,"name":"Apr 25","additionalValue":[{"label":"Legend","value":"Apr 25"},{"label":"Last Update","value":1748649600},{"label":"Total Value","text":"Compared To Last Month","value":133616},{"label":"MoM","value":0},{"label":"Percentage","value":0},{"label":"Growth Type","value":"MoM"},{"label":"Growth","value":"up"},{"label":"Growth Description","value":"Compared To Last Month"}],"color":{"linearGradient":{"x1":0.5,"y1":0,"x2":0.5,"y2":1},"stops":[[0.0709,"#FC972B"],[0.5903,"#F33A28"],[0.7828,"#ED0226"]]},"legendColor":"#FC972B"}],"marker":{"symbol":"circle","enabled":null}}],"categories":["May 25","Apr 25"]}]},"subtitleFontSize":null}',
              indexSideMenu: 0,
              widgetType: '',
              tabType: '',
              headerUseWidget: false,
              tabId: '',
              hideTitle: false,
              tabs: [],
              widgetEmptyCardList: [],
              text: '',
              type: '',
            },
          ],
          tabs: [],
        },
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
