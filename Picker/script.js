// JavaScript
//Variable for net
var net = 0;
var bgColour = 0;
var txtColour = 0;
//Variable for strongCombo
var strongCombo = 0;
//Variable for totalCombo
var totalCombo = 0;  
    var strongDemo = 0,
    totalDemo = 0,
    minTraining = 20,
    trained = false,
    inDemo = false,
    weakDemo = false,
    explicitTraining = false,
    trainingData = [];

function randomColour() {
    //Generate R,G,B using Math.random
   var r = Math.random(); 
   var g = Math.random(); 
   var b = Math.random(); 

    return {
        r,
        g,
        b,
      	toRGB: () => `rgb(${r * 255}, ${g * 255}, ${b * 255})`,
    };
}

function randomCombo() {
    //Call randomColour function for bgColour variable
    bgColour = randomColour();  
    container.style.backgroundColor = bgColour.toRGB();
    //Call randomColor function for txtColour variable
    txtColour = randomColour();  
    text.style.color = txtColour.toRGB();
}

function updateRatio() {
    exitDemo();
    totalCombo++;
    info.textContent = `${Math.round((strongCombo / totalCombo) * 1000) / 10}% random chance of desirable colour combination`;
}

function exitDemo() {
    inDemo = false;
    strongDemo = 0;
    totalDemo = 0;
}

window.onload = () => {
    c3.textContent = minTraining;
    //Assign net to be the brain
    net = new brain.NeuralNetwork();  
    //Call the randomCombo function
    randomCombo();  

    strong.onclick = () => {
        trained = false;
        trainingData.push({
            //Push bg as input and txt as output
            input: bgColour,
          	output: txtColour
              
        });
        demo.disabled = trainingData.length < minTraining;
      //Call the randomCombo function and increase strongCombo by 1
        strongCombo++;  
      	randomCombo();   
      
        updateRatio();
        c1.textContent = strongCombo;
    };

    weak.onclick = () => {
        //Call randomCombo function
        randomCombo();  
        updateRatio();
        c2.textContent = totalCombo - strongCombo;
    };

    demo.onclick = () => {
        inDemo = true;
        weakDemo = false;
        //Increase total demo and strongDemo by 1
        totalDemo++;  
        strongDemo++;  
        bgColour = randomColour();
        container.style.backgroundColor = bgColour.toRGB();

        if (!trained) {
            if (explicitTraining) trainingData.push({
                input: bgColour,
                output: txtColour
            });

            net.train(trainingData);
            trained = true;
            explicitTraining = false;
        }

        txtColour = net.run(bgColour);
        text.style.color = txtColour.toRGB();;
        info.textContent = `${Math.round((strongDemo / totalDemo) * 1000) / 10}% to suggest complementary text colour.`;
    };

    container.onclick = () => {
        if (inDemo) {
            txtColour = randomColour();
            text.style.color = txtColour.toRGB();

            if (!weakDemo) {
                weakDemo = true;
                info.textContent = `${Math.round((--strongDemo / totalDemo) * 1000) / 10}% to suggest complementary text colour.`;
            }

            trained = false;
            explicitTraining = true;
        }
    };
};
 
window.onkeydown = () => {
    if (event.code == 'ArrowLeft') strong.click();
    else if (event.code == 'ArrowRight') weak.click();
    else if (event.code == 'ArrowUp') demo.click();
    else if (event.code == 'ArrowDown') container.click();
};