class Card {
    constructor(rank, value, suit) {
        this.rank = rank;
        this.value = value;
        this.suit = suit;
    }

    toString() {
        return `${this.rank}${this.suit}`;
    }

    toHTML() {
        const isRed = this.suit === '&hearts;' || this.suit === '&diams;';
        return `<div class="card ${isRed ? 'red' : ''}">${this.rank}${this.suit}</div>`;
    }
}

class Deck {
    constructor() {
        this.reset();
    }

    reset() {
        // Using HTML entities for suits instead of Unicode characters
        const suits = ['&spades;', '&hearts;', '&diams;', '&clubs;'];
        const cardValues = [
            { rank: "2", value: 2 },
            { rank: "3", value: 3 },
            { rank: "4", value: 4 },
            { rank: "5", value: 5 },
            { rank: "6", value: 6 },
            { rank: "7", value: 7 },
            { rank: "8", value: 8 },
            { rank: "9", value: 9 },
            { rank: "10", value: 10 },
            { rank: "J", value: 10 },
            { rank: "Q", value: 10 },
            { rank: "K", value: 10 },
            { rank: "A", value: 11 }
        ];

        this.cards = [];
        for (const suit of suits) {
            for (const card of cardValues) {
                this.cards.push(new Card(card.rank, card.value, suit));
            }
        }
        this.shuffle();
    }

    shuffle() {
        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
    }

    draw() {
        if (this.cards.length === 0) {
            this.reset();
        }
        return this.cards.pop();
    }
}

// Rest of the JavaScript code remains the same...
class Hand {
    constructor() {
        this.cards = [];
    }

    addCard(card) {
        this.cards.push(card);
    }

    getValue() {
        let value = 0;
        let aceCount = 0;

        for (const card of this.cards) {
            value += card.value;
            if (card.rank === "A") {
                aceCount++;
            }
        }

        while (value > 21 && aceCount > 0) {
            value -= 10;
            aceCount--;
        }

        return value;
    }

    clear() {
        this.cards = [];
    }
}

class BlackjackGame {
    constructor() {
        this.deck = new Deck();
        this.playerHand = new Hand();
        this.dealerHand = new Hand();
        this.playerBalance = 1000;
        this.currentBet = 0;
        this.gameStatus = 'betting'; // betting, playing, finished

        // DOM elements
        this.playerHandEl = document.getElementById('player-hand');
        this.dealerHandEl = document.getElementById('dealer-hand');
        this.playerScoreEl = document.getElementById('player-score');
        this.dealerScoreEl = document.getElementById('dealer-score');
        this.messageEl = document.getElementById('message');
        this.balanceEl = document.getElementById('balance');
        this.betInput = document.getElementById('bet-amount');
        this.betButton = document.getElementById('place-bet');
        this.hitButton = document.getElementById('hit');
        this.standButton = document.getElementById('stand');
        this.newGameButton = document.getElementById('new-game');

        // Event listeners
        this.betButton.addEventListener('click', () => this.placeBet());
        this.hitButton.addEventListener('click', () => this.hit());
        this.standButton.addEventListener('click', () => this.stand());
        this.newGameButton.addEventListener('click', () => this.resetGame());

        this.updateControls();
    }

    placeBet() {
        const bet = parseInt(this.betInput.value);
        if (bet > this.playerBalance || bet < 10) {
            this.showMessage('Invalid bet amount!');
            return;
        }

        this.currentBet = bet;
        this.gameStatus = 'playing';
        this.startRound();
    }

    startRound() {
        this.playerHand.clear();
        this.dealerHand.clear();

        this.playerHand.addCard(this.deck.draw());
        this.dealerHand.addCard(this.deck.draw());
        this.playerHand.addCard(this.deck.draw());
        this.dealerHand.addCard(this.deck.draw());

        this.updateDisplay(true);
        this.updateControls();

        if (this.playerHand.getValue() === 21) {
            this.stand();
        }
    }

    hit() {
        this.playerHand.addCard(this.deck.draw());
        this.updateDisplay(true);

        if (this.playerHand.getValue() > 21) {
            this.endRound();
        }
    }

    stand() {
        while (this.dealerHand.getValue() < 17) {
            this.dealerHand.addCard(this.deck.draw());
        }
        this.endRound();
    }

    endRound() {
        this.gameStatus = 'finished';
        this.updateDisplay(false);

        const playerValue = this.playerHand.getValue();
        const dealerValue = this.dealerHand.getValue();

        if (playerValue > 21) {
            this.playerBalance -= this.currentBet;
            this.showMessage('Bust! You lose!');
        } else if (dealerValue > 21) {
            this.playerBalance += this.currentBet;
            this.showMessage('Dealer busts! You win!');
        } else if (playerValue > dealerValue) {
            this.playerBalance += this.currentBet;
            this.showMessage('You win!');
        } else if (dealerValue > playerValue) {
            this.playerBalance -= this.currentBet;
            this.showMessage('Dealer wins!');
        } else {
            this.showMessage("It's a tie!");
        }

        this.updateControls();
        this.updateBalance();
    }

    resetGame() {
        if (this.playerBalance < 10) {
            this.playerBalance = 1000;
        }
        this.gameStatus = 'betting';
        this.currentBet = 0;
        this.playerHand.clear();
        this.dealerHand.clear();
        this.updateDisplay(true);
        this.updateControls();
        this.updateBalance();
        this.showMessage('Place your bet!');
    }

    updateDisplay(hideDealer) {
        // Update player's hand
        this.playerHandEl.innerHTML = this.playerHand.cards.map(card => card.toHTML()).join('');
        this.playerScoreEl.textContent = `Value: ${this.playerHand.getValue()}`;

        // Update dealer's hand
        if (hideDealer && this.dealerHand.cards.length > 0) {
            this.dealerHandEl.innerHTML = this.dealerHand.cards[0].toHTML() + '<div class="card">?</div>';
            this.dealerScoreEl.textContent = '';
        } else {
            this.dealerHandEl.innerHTML = this.dealerHand.cards.map(card => card.toHTML()).join('');
            this.dealerScoreEl.textContent = `Value: ${this.dealerHand.getValue()}`;
        }
    }

    updateControls() {
        this.hitButton.disabled = this.gameStatus !== 'playing';
        this.standButton.disabled = this.gameStatus !== 'playing';
        this.betButton.disabled = this.gameStatus !== 'betting';
        this.betInput.disabled = this.gameStatus !== 'betting';
    }

    updateBalance() {
        this.balanceEl.textContent = `Balance: $${this.playerBalance}`;
        this.betInput.max = this.playerBalance;
    }

    showMessage(message) {
        this.messageEl.textContent = message;
    }
}

// Start the game
const game = new BlackjackGame();