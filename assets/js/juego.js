
( () => {

    'use strict'

    let deck       = [];
    const types    = ['C', 'D', 'H', 'S'],
          specials = ['A', 'J', 'Q', 'K'];
    
    let playerPoints = 0;
    let computerPoints = 0;
    
    // Referencias del HTML
    const btnDraw = document.querySelector('#btnDraw');
    const btnStop = document.querySelector('#btnStop');
    const btnNewGame = document.querySelector('#btnNewGame');
    const divPlayerCards = document.querySelector('#player-cards');
    const divComputerCards = document.querySelector('#computer-cards');
    const htmlPoints = document.querySelectorAll('small');
    
    //Esta función crea una nueva baraja.
    const makeDeck = () => {
    
    for( let i = 2; i<= 10; i++ ){
        for( let type of types ){
            deck.push( i + type);
        }
    
    }
    
    
    
    for( let type of types ){
        for( let special of specials ){
            deck.push( special + type);
        }
    }
    
    
    deck = _.shuffle( deck );
    return deck; 
    }
    
    makeDeck();
    
    
    // Esta función me permite tomar una carta
    
    const drawCard = () => {
    
        if( deck.length === 0 ){
            throw 'No more cards on deck';
        }
       const card = deck.pop();
        return card;
    }
    
    //for( let i = 0; i <= 100; i++ ) {
    //    drawCard();
    //}
    //drawCard ();
    
    const valueCard = ( card ) => {
    
        const value = card.substring(0, card.length - 1);
        return ( isNaN( value ) ) ?
                ( value === 'A' ) ? 11 : 10
                : value * 1;
    }
    
    // Computer turn
    
    const computerTurn = (minimumPoints) => {
    
        do{
            const card = drawCard();
            computerPoints = computerPoints + valueCard( card );
            htmlPoints[1].innerText = computerPoints;
    
            const imgCard = document.createElement('img');
            imgCard.src = `assets/cartas/cartas/${ card }.png`;
            imgCard.classList.add('carta');
            divComputerCards.append( imgCard );
    
            if( minimumPoints > 21 ) {
                break;
            }
    
        }while( (computerPoints < minimumPoints) && ( minimumPoints <= 21) );
    
    
        setTimeout(() => {
        
            if (computerPoints === minimumPoints) {

                alert('OMG nobody wins');
            } else if (minimumPoints > 21) {
            
                alert('Computer wins ! ');
            } else if( computerPoints > 21) {
                alert('Player 1 wins ! ');
            } else if( computerPoints === playerPoints) {
            
                alert('nobody wins');
            } else {
                alert(' Computer wins again');
            }
        }, 10  );
    
    
    
        
    
    
    
    }
    // Events
    btnDraw.addEventListener('click', () => {
        const card = drawCard();
        playerPoints = playerPoints + valueCard( card );
        htmlPoints[0].innerText = playerPoints;
    
    //<img class="carta" src="assets/cartas/cartas/7D.png">
    const imgCard = document.createElement('img');
    imgCard.src = `assets/cartas/cartas/${ card }.png`;
    imgCard.classList.add('carta');
    divPlayerCards.append( imgCard );
    
    
    if ( playerPoints > 21 ){
        console.warn('defeat');
        btnDraw.disabled = true;
        btnStop.disabled = true;
        computerTurn(playerPoints);
    } else if( playerPoints === 21){
        console.warn('21, amazing !');
        btnDraw.disabled = true;
        btnStop.disabled = true;
        computerTurn(playerPoints);
    }
    
    
    
    });
    
    
    btnStop.addEventListener( 'click', () => {
    
        const check = computerTurn();
        
        btnStop.disabled = true;
        btnDraw.disabled = true;
        computerTurn( playerPoints );
    }
    
    
    );
    
    btnNewGame.addEventListener( 'click', () => {
    
    
        //location.reload();
    
    
        console.clear();
    
        deck = [];
        deck = makeDeck();
    
        playerPoints   = 0;
        computerPoints = 0;
    
        htmlPoints[0].innerText = 0;
        htmlPoints[1].innerText = 0;
    
        divComputerCards.innerHTML = '';
        divPlayerCards.innerHTML   = '';
    
        btnStop.disabled = false;
        btnDraw.disabled = false;
    }
    );
    
    
    
    
    
    
    if ( playerPoints >= 21){
        btnStop.disabled = true;
        btnDraw.disabled = true;
    };
    
    
    
    



})();



    //       ESTA ES LA FORMULA LARGA PARA REALIZAR LA OPERACION, PERO USAREMOS LA CONDICIÓN TERNARIA
    //let points = 0;
    ////console.log({ value });// 2 = 2, 10 = 10....
    //if( isNaN( value )){
    //    
    //    points = ( value === 'A' ) ? 11 : 10;
    //} else {
    //    console.log('Is a number');
    //    points = value * 1;
    //}
//
    //console.log( points);



//const value = valueCard( drawCard());
//console.log({ value});