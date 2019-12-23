void main() {
  var deck = new Deck();
  deck.shuffle();
  print(deck.cardsWithSuit('Spades'));
}

class Deck {
  List<Card> cards = [];

  Deck() {
    var ranks = ['Ace', 'Two', 'Three', 'Four', 'Five'];
    var suits = ['Diamonds', 'Hearts', 'Clubs', 'Spades'];

    // For loop
    for (var mySuit in suits) {
      for (var myRank in ranks) {
        var card = new Card(
          rank: myRank,
          suit: mySuit,
        );
        cards.add(card);
      }
    }
  }

  toString() {
    return cards.toString();
  }

  shuffle() {
    cards.shuffle();
  }

  cardsWithSuit(String suit) {
    return cards.where((card) => card.suit == suit);
  }

  deal(handSize) {
    var hand = cards.sublist(0, handSize);
    cards = cards.sublist(handSize);
    return hand;
  }

  removeCard(String rank, String suit) {
    cards.removeWhere((card) => (card.suit == suit) && (card.rank == rank));
  }
}

class Card {
  String rank;
  String suit;

  Card({this.rank, this.suit});

  toString() {
    return '$rank of $suit';
  }
}
