Primitive, for storing simple values
References, for storing complex objects

Escape Sequence?
Order Of Operations?
Casting?

//   Set “total” to 0.
//   Set “count” to 1.
//  [loop]
//   Set “compare” to “count”.
//   Subtract 11 from “compare”.
//   If “compare” is zero, continue at [end].
//   Add “count” to “total”.
//   Add 1 to “count”.
//   Continue at [loop].
//  [end]
//   Output “total”.

let total = 0, count = 1;
while (count <= 10) {
  total += count;
  count += 1;
}
console.log(total);

// SQL

products
id 	name 	description 	price
1 	Retro Gaming T-Shirt 	All your fave gaming characters on one t-shirt. 	10.99
2 	Generic Super Hero T-Shirt 	Your fave super hero is on this shirt. Wear it. 	11.99
3 	Some Quirky Phrase T-Shirt 	Annoy your friends with this t-shirt. They'll seeing this phrase everytime you wear it. 	9.99

users
id 	username 	password 	first_name 	last_name
1 	chalkers 	$2a$10$qUNdEvICzo2vIo85/i8iiubY90liWE8o.EcvdNBw4KtINOv8iccNq 	Andrew 	Chalkley
2 	sawmac 	$2a$10$bnckAlwO2SKxLCHu7D..meXeFs936PztodvykE.SgJ4QZ3Cy.1nje 	Dave 	McFarland
3 	pasanpr 	$2a$10$N12mnNuSFS114jztcvqqoOzeVjDEILhkmfm8yE4yvLx.lmudvVzMq 	Pasan 	Premaratne
4 	lozzy 	$2a$10$3jtLlaXL0kk4mMTaNn/oRO7RQcJ77s2Ijdl9STRQDT6mNOaM0g3nC 	Lauren 	Chalkley
5 	rocky 	$2a$10$h.LhtX2nPzeLcZrjTI9pQu1SQ5VXSuT/re3cppNo6/n72hkP7dA2a 	Rachael 	Hinkley
6 	wig_lady 	$2a$10$4y5tMVDQBHLD6O5HVuwFP.ghly/9OT2kD6fAkdev5cItKjd0zLCcK 	Lola 	Love
7 	2spooky4me 	$2a$10$/KTPkQcFGpqPoUlgefMHAOa6nnyXgVrWEmYqtcqsbJ0YphWrIjXci 	Nick 	Pettit
8 	racing_car 	$2a$10$wMOhSC60IyXYaKPlDsne1OLvdDSfbVNU4RCG5D5KYhItDU2rgMA8i 	Cory 	Tepper
9 	beard_man 	$2a$10$8COKxWD10hzmS6E377PXEO0u02xMcbdoBK6PVNG05jiPsog5cihka 	Jim 	Hoskins
10 	poley_hands 	$2a$10$GfoPQzld9v/H4pvKarh7nOemf8KaDkKilVwdKMcbCEjTJgh95Tb4a 	Michael 	Poley

user_addresses
id 	nickname 	street 	city 	state 	zip 	user_id
1 	Home 	1874 24th AVE 	Lincoln City 	OR 	97233 	1
2 	Work 	2538 4th AVE 	Tilamook 	OR 	97242 	1
3 	Home 	1128 24th PL 	Portland 	OR 	97238 	2
4 	Work 	2325 4th ST 	Salem 	OR 	97227 	2
5 	Home 	3392 13th ST 	Portland 	OR 	97260 	3
6 	Work 	1563 3rd PL 	Tilamook 	OR 	97252 	3
7 	Home 	320 24th AVE 	Portland 	OR 	97256 	4
8 	Work 	1199 1st AVE 	Lincoln City 	OR 	97259 	4
9 	Home 	3411 1st PL 	Salem 	OR 	97240 	5
10 	Work 	1878 13th AVE 	Newport 	OR 	97249 	5
11 	Home 	2199 1st AVE 	Salem 	OR 	97204 	6
12 	Work 	958 2nd PL 	Medford 	OR 	97282 	6
13 	Home 	3817 13th ST 	Portland 	OR 	97230 	7
14 	Work 	2328 13th ST 	Lincoln City 	OR 	97231 	7
15 	Home 	2593 102nd ST 	Salem 	OR 	97253 	8
16 	Work 	3482 24th AVE 	Salem 	OR 	97256 	8
17 	Home 	812 103rd ST 	Salem 	OR 	97282 	9
18 	Work 	2772 6th PL 	Portland 	OR 	97284 	9
19 	Home 	3457 102nd AVE 	Newport 	OR 	97262 	10
20 	Work 	2487 102nd AVE 	Salem 	OR 	97296 	10
