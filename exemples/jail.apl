domain {
   types { Guard, Door, Prisoner, Alarm }
   concepts {  }
   world {
   }
   state {
      predicate HasKeyP(Prisoner);
      predicate HasKeyG(Guard);
      predicate CanReachD(Prisoner, Door);
      predicate CanReachG(Prisoner, Guard);
      predicate CanReachP(Prisoner, Prisoner);
      predicate Open(Door);
      predicate Locked(Door);
      numeric   Dazed(Guard);
   }

/************************************
           A c t i o n s 
*************************************/
   action StealKey(Guard g, Prisoner p){
   	   //controlled;
       duration: constant 40;
       cost: constant 1;
       conditions:
          @start: Dazed(g) > 50;
          @start: CanReachG(p,g);
          @start: HasKeyG(g);
          @start: !HasKeyP(p);
       effects:
          @end: HasKeyP(p);
          @end: !HasKeyG(g);
   }
	   
   action OpenDoor(Prisoner p, Door d){
   	   controlled;
       duration: constant 40;
       cost: constant 1;
       conditions:
          @start: CanReachD(p,d);
          @start: !Open(d);
          @start: HasKeyP(p);
       effects:
          @end: Open(d);
   }
   
   action ExchangeKey(Prisoner pa, Prisoner pb){
       duration: constant 40;
       cost: constant 1;
       conditions:
          @start: CanReachP(pa,pb);
          @start: HasKeyP(pa);
          @start: !HasKeyP(pb);
       effects:
          @end: HasKeyP(pb);
          @end: !HasKeyP(pa);
   }
   
   /*action HitGuard(Prisoner p, Guard g){
       duration: constant 40;
       cost: constant 1;
       conditions:
          @start: CanReachG(p,g);
    	  @start: Dazed(g) < 60;
       effects:
          @end: increase Dazed(g) 10;
   }*/
	
}