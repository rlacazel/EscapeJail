domain {
   types { Guard, Door, Prisoner, Alarm }
   concepts { AngryGuard, DetectSteal, DistractedGuard, HitPrisoner, Noise, StealKey }
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
      predicate HasStolenKey(Prisoner, Guard);
      numeric   Distracted(Guard);
      numeric   Angry(Guard);
      numeric   NoiseAround(Guard);
      numeric   Health(Prisoner);
   }

/************************************
           A c t i o n s 
*************************************/
   /*action StealKey(Prisoner p, Guard g){
   	   //controlled;
       duration: constant 40;
       cost: constant 1;
       conditions:
          @start: CanReachG(p,g);
          @start: HasKeyG(g);
          @start: !HasKeyP(p);
       effects:
          @end: HasKeyP(p);
          @end: !HasKeyG(g);
   }*/
	   
	action MakeNoise(Prisoner p, Guard g){
       duration: constant 10;
       cost: constant 10;
       conditions:
       		@start: NoiseAround(g) < 45;
            @start: CanReachG(p,g);
       effects:
          @end: increase NoiseAround(g) 20;
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
   
    // Reaction of a stolen key
	/*fcm StealKeyReaction(Prisoner p, Guard g){
		conditions:
       		@start: HasStolenKey(p,g);
       		@start: CanReachG(p,g);
       inputs:
       		Noise = NoiseAround(g);
       		AngryGuard = Angry(g);
       		DistractedGuard = Distracted(g);
       outputs:
       		:Health(p) = HitPrisoner;
       		:!HasKeyP(p) = TakeBackKey;
          	:HasKeyG(g) = TakeBackKey;
          	:!HasStolenKey(p,g) = TakeBackKey;
	}*/
	
	// Reaction of a stolen key
	fcm StealKey(Prisoner p, Guard g) {
		// controlled;
		conditions:
       		@start: CanReachG(p,g);
          	@start: HasKeyG(g);
          	@start: !HasKeyP(p);
       inputs:
       		Noise = NoiseAround(g);
       		AngryGuard = Angry(g);
       		DistractedGuard = Distracted(g);
       outputs:
       		:-Health(p) = HitPrisoner;
       		:HasKeyP(p) = !DetectSteal;
          	:!HasKeyG(g) = !DetectSteal;
	}
}