export const fetchNews = async () => {
  // TODO: Implement the logic to fetch news from a real API
  return [
    { id: '1', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB-Mdl6nJ7XofN5eM3nNKFR7eW-bddxJMdo6AVgYzq--aNkWYkOGSqt89acqsNBhM32XB3xsjY1TdL5IQyH-VreZyNwnovnc74udlgveDyoaxhHcN2RxVSxo0iPOHKVH2kZdc6wrufPEQNPhgPNXpLywSxINP_8ab6qSsnyWvcHzLWeJezDGN4tUI_QzeeSPyMQKieRn2edFomdob65nA_fDBV6sA3Srqv-OZzACezVYoY_b8KmqtTdd6D7QGiv0bOT0GKAmJcuNlvP', title: 'Max Verstappen Dominates in Monaco', source: 'Formula 1 · 2h' },
    { id: '2', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA0mYrq1lFQHwEwhJvZC5h5TpM-BwXa3uDGZAy2NUuoCPV-u-mKtpq-6mstRTWuwcd3C_x_nVF05VpezJ69fY9_BTztswdUG8FgX_9S2MYTXgY-Ur511NF7Bb89iJ5yWFatuVkdhn-A4wkzIJYl1n7N1YOuuIgBysU1pZS050p67geBT1IbtUrsvtKDzztya-aNph_N52KYsJJAlHXHpQN-vcdwnMd9PIAU1IhDAM-R7wMubjZMe_HTxE00QZVNctKTOxFugWC3ohBV', title: "Ferrari's Strategy Under Scrutiny", source: 'Motorsport News · 4h' },
    { id: '3', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCGk9fsZyWEl1U9J32xWINqGmT1RCjnF2BIR0M0gQ8Pt_CiLTJ_baZoVXEUHZdU5uYY5cGMA1gPrTKXeQHciEhQnD3SrBJR69c6Ts764LSd2hLbj__JxG0-ozmgnpT5Sx5-qgsaespzqLKTNXMmveedrvgrB0a59Zv6yl9BNx9dHbq6-FY5PEd6DQSjzVxxGOnMMNf68q5B032BxLUoUsWu-ZFZf0G-9RM215w4PAFBPR9YEOC9iZHcLTgifO5WGlEdwFmBKLu82wOZ', title: "Mercedes' Upgrades Show Promise", source: 'F1 Insider · 6h' },
    { id: '4', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDeYnm0fD_rX25KsVCEPP7Wa2LJmXiggyYr7gafTPn1oSGSMBhw_kUEgOU71JRwaQBOD9PBigs7TkMLX6d2KQpS6APCHZqZYnypl3azYt6FM28HW-lSUKQMPRLwslYB-s_BCUFYlgIHIS8Ff3QZt8mTPCFgbiKmo9oYOpTroZnPMaIfvrR3SUwcZMXhabfXOa9lwE5CFt80kbrTW4d_EF_qszw2Anvy0z9aDaR1ZykuTx6cTn-FRBMG0aEn4YybfAvVWX3SAfM5DShr', title: "Red Bull's Pit Stop Crew Sets New Record", source: 'Racing Weekly · 8h' },
  ];
};

export const fetchTopVideos = async () => {
  // TODO: Implement the logic to fetch top videos from a real API
  return [
    { id: '1', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCO25P0anW4wegba0UcANGJDxGi1OElQEGanOS8DHjnyelSOn7jbaI8WvH4f8l--t3Hdz4L58yfJz2S8EdDW5wmCGzqWgWJem8vjjwzr7DZ7P4QQRrgK9JtYobNAtFItuTrnWvyMVJQR2pFJWSOosvT-7JZbIFq7J907DX25Q9bZ09y1nAUfF0fCJiSvSrHYkMg4b6elLWQgE6Tf2K-dYQulq9wHQ4KFYFym_W_9-ww_45vuKif7mnZzj7qCqdQIzuM6YIjPLBE8kX5', title: 'Race Highlights' },
    { id: '2', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDMuf2j49S0-SNWbuXwLPlCuC_GB0pa6s3jcZBwYOlCkTWw1KKShkyaz_Ff--uL1OwkHKKGsKgEq2P8RVinMC-0o2GhK6LwsUm0Db6d8_A3Bbrl0YLo6woIwJyOR-cz4RimptCPxWyw1rAW73DK2C3j9Fe_5G-RlHARpi9Vwk8ba6zR4x3mywE8d5Fj69QXwwSeuw6wlKbGy6dTPpmvAgzoxyyC2nxb5czowgCOHDoi75Yckli2s1QFWGV2OBUnlplSkGpRjuYh442C', title: 'Driver Spotlight' },
    { id: '3', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAe2utJ9SXqrn0SoOqY3puYzde860Gk05mtEVyj9uSBxHzzndriJ_FlLdpN0-cyTrjuqFL2XgN-X6q4tNysZKPacpOI-1AOOfacwPcmIfWryD7XxxspQogStenVqejGChmzPBG1UuvXJcZezfgD5n6o94zEbr0cDo9B1w5lPQ2PcgWUDkV4JfKLoanHTDsn2DoXDtoOUyqO0WcC42a7bE3HzpCbSKxRd4HKW9aml4A7A8aTrn8JZr5GM9ujm4-LZrOVJXzqXPxg_GNT', title: 'Team Updates' },
    { id: '4', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAAvNd_1ZIuumVql7iWRVO62rVIRm0LqsNN7c5BiKiaWGPFRiNPQGjNPStGMtoWUemAkQ5V5zffZol48yjDABfwATcDBTsGISR56i9NynOm2n4aW9vd_czLa-lzVj7sz425JnX-IGiIQeVhDI8rjWqzyTYLhkbetuS_5QFrmXIBoOQrnLajXpxFsikIKXC-pZXM3Z2rnX_zsCg9ibIRqYzPjRyx9NfWZjCMt-UYObAbew-FGI1gU8h7rYPj1-p5YT0R4fbWFrq0UzBp', title: 'Circuit Preview' },
    { id: '5', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBkfstlQ6LaZi6hKcPky-iDBe8IuUaAQqh41Mq4fkBGR0thAyF46ocCTphJKOwrxN3FGZjpfbHJXcx3sEfnyJQR9Jw7YNk-RTe08i1IxiZfzqZMaehEeKXvJVLRJhWfezDRvI_40c8MmX90Y6xoZ6jCa5dCN3zY_XPSzaQRXWfqbsA-g3Rc1Sh2HeUi4mijR3bRv_GzNzpSFuIMcgpFWlrUM5SUKIvdQhEsJAM9E07MrpZ0gGPpyT6Iu3RIosBqRYIW-PDMcFOrLCnn', title: 'Fan Predictions' },
  ];
};
