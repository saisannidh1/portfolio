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
        const suits = ['&spades;', '&hearts;', '&diams;', '&clubs;'];
        const cardValues = [
            {rank: "2", value: 2},
            {rank: "3", value: 3},
            {rank: "4", value: 4},
            {rank: "5", value: 5},
            {rank: "6", value: 6},
            {rank: "7", value: 7},
            {rank: "8", value: 8},
            {rank: "9", value: 9},
            {rank: "10", value: 10},
            {rank: "J", value: 10},
            {rank: "Q", value: 10},
            {rank: "K", value: 10},
            {rank: "A", value: 11}
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
            if (card.rank === "A") {
                aceCount++;
                value += 11;
            } else {
                value += card.value;
            }
        }

        while (value > 21 && aceCount > 0) {
            value -= 10;
            aceCount--;
        }

        return value;
    }

    hasBlackjack() {
        return this.cards.length === 2 && this.getValue() === 21;
    }

    isBusted() {
        return this.getValue() > 21;
    }

    canSplit() {
        return this.cards.length === 2 && this.cards[0].rank === this.cards[1].rank;
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
        this.splitHands = [];
        this.playerBalance = 1000;
        this.currentBet = 0;
        this.insuranceBet = 0;
        this.gameState = 'betting';

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
        this.doubleDownButton = document.getElementById('double-down');
        this.splitButton = document.getElementById('split');
        this.insuranceButton = document.getElementById('insurance');

        this.betButton.addEventListener('click', () => this.placeBet());
        this.hitButton.addEventListener('click', () => this.hit());
        this.standButton.addEventListener('click', () => this.stand());
        this.doubleDownButton.addEventListener('click', () => this.doubleDown());
        this.splitButton.addEventListener('click', () => this.split());
        this.insuranceButton.addEventListener('click', () => this.placeInsurance());

        this.updateControls();
        this.updateBalance();
        this.showMessage('Place your bet!');
    }

    placeBet() {
        const bet = parseInt(this.betInput.value);
        if (bet > this.playerBalance || bet < 10 || isNaN(bet)) {
            this.showMessage('Invalid bet amount!');
            return;
        }

        this.currentBet = bet;
        this.playerBalance -= bet;
        this.gameState = 'playing';
        this.startRound();
    }

    startRound() {
        this.deck = new Deck();
        this.playerHand.clear();
        this.dealerHand.clear();
        this.splitHands = [];

        this.playerHand.addCard(this.deck.draw());
        this.dealerHand.addCard(this.deck.draw());
        this.playerHand.addCard(this.deck.draw());
        this.dealerHand.addCard(this.deck.draw());

        this.updateDisplay();
        this.updateControls();
        this.checkDealerBlackjack();
    }

    checkDealerBlackjack() {
        if (this.dealerHand.cards[0].rank === "A") {
            this.insuranceButton.disabled = false;
        }
        if (this.dealerHand.hasBlackjack()) {
            this.endRound();
        }
    }

    hit() {
        this.playerHand.addCard(this.deck.draw());
        this.updateDisplay();

        if (this.playerHand.isBusted()) {
            this.endRound();
        } else {
            this.updateControls();
        }
    }

    stand() {
        this.playDealerHand();
        this.endRound();
    }

    playDealerHand() {
        while (this.dealerHand.getValue() < 17 || (this.dealerHand.getValue() === 17 && this.dealerHand.cards.some(card => card.rank === "A"))) {
            this.dealerHand.addCard(this.deck.draw());
        }
    }

    doubleDown() {
        if (this.playerBalance < this.currentBet) {
            this.showMessage('Insufficient balance to double down!');
            return;
        }
        this.playerBalance -= this.currentBet;
        this.currentBet *= 2;
        this.playerHand.addCard(this.deck.draw());
        this.updateDisplay();
        this.stand();
    }

    split() {
        if (this.playerBalance < this.currentBet) {
            this.showMessage('Insufficient balance to split!');
            return;
        }
        const newHand = new Hand();
        newHand.addCard(this.playerHand.cards.pop());
        this.splitHands.push(newHand);
        this.playerBalance -= this.currentBet;

        this.playerHand.addCard(this.deck.draw());
        newHand.addCard(this.deck.draw());

        this.updateDisplay();
        this.updateControls();
    }

    placeInsurance() {
        if (this.playerBalance < this.currentBet / 2) {
            this.showMessage('Insufficient balance for insurance!');
            return;
        }
        this.insuranceBet = this.currentBet / 2;
        this.playerBalance -= this.insuranceBet;
        this.updateBalance();
        this.insuranceButton.disabled = true;
    }

    endRound() {
        this.gameState = 'finished';
        this.updateDisplay();

        const playerValue = this.playerHand.getValue();
        const dealerValue = this.dealerHand.getValue();

        if (this.dealerHand.hasBlackjack()) {
            if (this.insuranceBet > 0) {
                this.playerBalance += this.insuranceBet * 3;
                this.showMessage('Insurance bet won!');
            }
            if (this.playerHand.hasBlackjack()) {
                this.playerBalance += this.currentBet;
                this.showMessage("Both have Blackjack. It's a push!");
            } else {
                this.showMessage('Dealer has Blackjack. You lose!');
            }
        } else if (this.playerHand.hasBlackjack()) {
            this.playerBalance += this.currentBet * 2.5;
            this.showMessage('Blackjack! You win!');
        } else if (this.playerHand.isBusted()) {
            this.showMessage('Bust! You lose!');
        } else if (this.dealerHand.isBusted()) {
            this.playerBalance += this.currentBet * 2;
            this.showMessage('Dealer busts! You win!');
        } else if (playerValue > dealerValue) {
            this.playerBalance += this.currentBet * 2;
            this.showMessage('You win!');
        } else if (dealerValue > playerValue) {
            this.showMessage('Dealer wins!');
        } else {
            this.playerBalance += this.currentBet;
            this.showMessage("It's a tie!");
        }

        this.splitHands.forEach((hand, index) => {
            const splitValue = hand.getValue();
            if (hand.hasBlackjack()) {
                this.playerBalance += this.currentBet * 2.5;
                this.showMessage(`Split hand ${index + 1}: Blackjack!`);
            } else if (hand.isBusted()) {
                this.showMessage(`Split hand ${index + 1}: Bust!`);
            } else if (splitValue > dealerValue || this.dealerHand.isBusted()) {
                this.playerBalance += this.currentBet * 2;
                this.showMessage(`Split hand ${index + 1}: Wins!`);
            } else if (splitValue < dealerValue) {
                this.showMessage(`Split hand ${index + 1}: Loses!`);
            } else {
                this.playerBalance += this.currentBet;
                this.showMessage(`Split hand ${index + 1}: Push!`);
            }
        });

        this.updateControls();
        this.updateBalance();

        setTimeout(() => {
            this.resetForNextRound();
        }, 3000);
    }

    resetForNextRound() {
        if (this.playerBalance < 10) {
            this.playerBalance = 1000;
            this.showMessage('Your balance has been reset to $1000 for a new game!');
        } else {
            this.showMessage('Place your bet for the next round!');
        }

        this.gameState = 'betting';
        this.currentBet = 0;
        this.insuranceBet = 0;
        this.playerHand.clear();
        this.dealerHand.clear();
        this.splitHands = [];
        this.updateDisplay();
        this.updateControls();
        this.updateBalance();
    }

    updateDisplay() {
        this.playerHandEl.innerHTML = this.playerHand.cards.map(card => card.toHTML()).join('');
        this.playerScoreEl.textContent = `Value: ${this.playerHand.getValue()}`;

        if (this.gameState === 'playing') {
            this.dealerHandEl.innerHTML = this.dealerHand.cards[0].toHTML() + '<div class="card back">?</div>';
            this.dealerScoreEl.textContent = '';
        } else {
            this.dealerHandEl.innerHTML = this.dealerHand.cards.map(card => card.toHTML()).join('');
            this.dealerScoreEl.textContent = `Value: ${this.dealerHand.getValue()}`;
        }

        const splitHandsEl = document.getElementById('split-hands');
        splitHandsEl.innerHTML = '';
        this.splitHands.forEach((hand, index) => {
            const splitHandEl = document.createElement('div');
            splitHandEl.className = 'split-hand';
            splitHandEl.innerHTML = `
                <h3>Split Hand ${index + 1}</h3>
                <div class="hand">${hand.cards.map(card => card.toHTML()).join('')}</div>
                <div>Value: ${hand.getValue()}</div>
            `;
            splitHandsEl.appendChild(splitHandEl);
        });
    }

    updateControls() {
        this.hitButton.disabled = this.gameState !== 'playing';
        this.standButton.disabled = this.gameState !== 'playing';
        this.betButton.disabled = this.gameState !== 'betting';
        this.betInput.disabled = this.gameState !== 'betting';

        this.doubleDownButton.disabled = this.gameState !== 'playing' || this.playerHand.cards.length !== 2 || this.playerBalance < this.currentBet;
        this.splitButton.disabled = this.gameState !== 'playing' || !this.playerHand.canSplit() || this.playerBalance < this.currentBet;
        this.insuranceButton.disabled = this.gameState !== 'playing' || this.dealerHand.cards[0].rank !== "A" || this.playerBalance < this.currentBet / 2;

        this.doubleDownButton.style.display = this.gameState === 'playing' && this.playerHand.cards.length === 2 ? 'inline-block' : 'none';
        this.splitButton.style.display = this.gameState === 'playing' && this.playerHand.canSplit() ? 'inline-block' : 'none';
        this.insuranceButton.style.display = this.gameState === 'playing' && this.dealerHand.cards[0].rank === "A" ? 'inline-block' : 'none';
    }

    updateBalance() {
        this.balanceEl.textContent = `Balance: $${this.playerBalance}`;
        this.betInput.max = this.playerBalance;
    }

    showMessage(message) {
        this.messageEl.textContent = message;
    }
}

const game = new BlackjackGame();