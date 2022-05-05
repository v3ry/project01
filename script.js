
function contreMesure() {
    let doc=document;
    let name="mynameID";
    let i=doc.createElement("div");
    i.setAttribute("id",name);
    i.setAttribute("class","contremesure");
    i.innerHTML="Adblock détecté <br> Merci de désactiver votre AdBlock pour le site Tout JavaScript";  
    let s=doc.getElementsByTagName("div");          
    doc.body.appendChild(i);
    let testh1 = document.querySelector("h1");
    testh1.setAttribute("style","color:red;");
  }


  (function(action) {
    let doc=document;
    TJSdetect={
      version: '1.0',
      elementID:'TJSdetection',
      launched: false,
      complete: false,
      success: false,
      detected: false,
      timeoutID: null,
      progress: 0,
      timer: 0,
      onComplete: function(){ /* Fin de l'analyse */
        this.log("Complete:"+this.complete+" Success:"+this.success+" Detected:"+this.detected);
      },
      onDetect: function() {  /* Détection du bloqueur : lancement de action */
        this.log("onDetect()");
        action();
      },
      
      /* Vérifie la présence de l'élément publicitaire HTML */
      testElement: function() {
        this.progress=4;      
        this.log("testElement()");
        let i=doc.getElementById(this.elementID);
        if (typeof i === "undefined") { /* Element non trouvé */
          this.complete=true;
          this.success=false;
          this.detected=false;
        } else {
          if (i.offsetParent===null) { /* Elément caché : ABP */
            this.complete=true;
            this.success=true;
            this.detected=true;
            this.onDetect();
          } else {
            this.complete=true;
            this.success=true;
            this.detected=false;
          }    
        }
        this.progress=9;
        this.onComplete();
      },
        
      /* Lancement global de la détection */
      launch: function() {
        this.timer=this.getTimer(); /* Init chrono */
        this.log("Lancement TJSdetect version "+this.version);
        this.launched=true;    
        this.progress=1;            
        
        /* Attacher l'élément HTML */
        let element=doc.createElement("div");
        element.setAttribute("id",this.elementID);
        /* Définir une caractéristique qui déclenche la suppression par adblock */
        element.setAttribute("class","adsbygoogle"); 
        /* Rendre invisible cet élément aux utilisateurs */
        element.setAttribute("style","position:absolute; top:-10px; left:-10px; width:1px; height:1px;");
        doc.body.appendChild(element);
        this.progress=2;      
        this.log("Element HTML id='"+this.elementID+"' ajouté");
        
        /* Attendre un délai suffisant pour que Adblock puisse traiter l'élément */        
        this.timeoutID=setTimeout(this.testElement.bind(this), 250);
      },
        
      /* Outils de log et timers performances */
      getTimer: function() {
        if (typeof window.performance !== undefined) {
          return window.performance.now();
        } else {
          let d=new Date();
          return d.getTime();            
        }
      },        
      log: function(l) {
        let h=(this.getTimer()-this.timer);
        if (typeof console !== undefined) {
          console.log(h.toFixed(1)+" ms : "+l+" (progression="+this.progress+")");
        }
      },
    }
    TJSdetect.launch();
  })(contreMesure); /* La fonction contreMesure est définie pour afficher un message */