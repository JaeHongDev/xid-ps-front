(async ()=>{
    try{
        const response =  await fetch("http://localhost:3001")
        console.log(response);
    }catch (e){
        console.log(e);
    }
    finally {
        console.log('finally');
    }

})();
