const awsurl = 'https://epjni7nxdv7aidm5ytfd3hvfvq0exbki.lambda-url.us-east-2.on.aws/';
const awsurl2 = 'https://3zl4wwrcx6wvfnr53xtnr4vurq0ltkmd.lambda-url.us-east-2.on.aws/'
const awsurl3 = 'https://f2zqearravb3x2v4nlnind26om0hchvd.lambda-url.us-east-2.on.aws/'
const onClick = async () => {
    var image = document.getElementById("image");
    var distance = document.getElementById("distance");
    var loc1 = document.getElementById("loc1").value;
    var loc2 = document.getElementById("loc2").value;
    try{
        var loc;
        if(loc1==""&&loc2==""){
            distance.innerHTML = "Enter at least 1 address";
        }
        else if(loc1==""||loc2==""){
            if(loc1==""){
                loc = loc2;
            }
            else{
                loc = loc1;
            }
            const res3 = await fetch(awsurl3, {
                method: 'POST',
                body: JSON.stringify({
                    loc: loc
                })
            });
            const data3 = await res3.json();
            const data4 = JSON.parse(data3.body);
            image.src = 'data:image/png;base64,'+data4;
            distance.innerHTML = "";
        }

        else{
            const res = await fetch(awsurl, {
                method: 'POST',
                body: JSON.stringify({
                    loc1: loc1,
                    loc2: loc2
                })
            });
            const data = await res.json();
            
            const res2 = await fetch(awsurl2, {
                method: 'POST',
                body: JSON.stringify({
                    loc1: loc1,
                    loc2: loc2
                })
            });
            const data2 = await res2.json();
            if(data2.hasOwnProperty('error')){
                distance.innerHTML = data2.error;
                return;
            }
            image.src = 'data:image/png;base64,'+data;
            distance.innerHTML = data2.lengthKM + " KM, "+ data2.lengthMi + " Mi";
        }
    }
    catch(error){
        distance.innerHTML = error;
    }
    return;
    
}

document.getElementById("mapButton").addEventListener("click", onClick);

