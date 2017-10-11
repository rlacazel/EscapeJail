domain {
   types { Nurse, Material, Victim, Injury, State, BodyPart }
   concepts { CoverInjury, InjuryGravity, VictDie, VictNotBreathing }
   world {
	    function State HEALED();
	    function State GOOD();
        function State AVERAGE();
        function State BAD();
        function State UNKNOWN();
      	numeric  Value(State);
   }
   state {
      predicate InBox(Material);
      predicate Hold(Material,Nurse);
      predicate OnVictim(Material,Victim);
      predicate On(Injury,Victim);
      predicate Loc(Injury,BodyPart);
      predicate FreeHand(Nurse);
      predicate Die(Victim);
      predicate InjuryState(Injury,State);
      predicate Cover(Injury);
      predicate IsNotBreathing(Victim);
      numeric   Test(Victim);
   }

// On veux la mettre en difficulté en maximisant des actions avec une score de difficulté mais qu'elle puisse quand meme s'en sortir
// en proposant donc un chemin atteignant l'objectif final

// Dans le plan, tout dois se produire des qu'il peut !

/************************************
           A c t i o n s 
*************************************/
   action Take(Nurse n, Material m){
       duration: constant 40;
       cost: constant 1;
       criteria: difficulty 0, stress 1; 
       conditions:
          @start: InBox(m);
          @start: !Hold(m,n);
       effects:
          @end: !InBox(m);
          @end: Hold(m,n);
		  @end: !FreeHand(n);
   }

   action Apply(Nurse n, Material m, Victim v, Injury i, BodyPart bp, State cur_s, State s_healed){
      duration: constant 40;
      conditions:
         @start: Hold(m,n);
		 @start: On(i,v);
		 @start: Loc(i,bp);
         @start: HEALED()=s_healed;
		 @start: InjuryState(i,cur_s);
		 @start: !Cover(i);
         @overall: !Die(v);
         // @start: Test(v) == 10;
      effects:
		 @end: !InjuryState(i,cur_s);
		 @end: InjuryState(i,s_healed);
         @end: !Hold(m,n);
         @end: OnVictim(m,v);
         @end: FreeHand(n);
         @end: increase Test(v) 10;
   }
   
   action GarrotBreak(Material m, Victim v, Injury i, State cur_s, State new_s){
   	  controlled;
      criteria: difficulty 1, stress 1; 
      conditions:
         @start: OnVictim(m,v);
		 @start: On(i,v);
         @start: AVERAGE()=new_s;
		 @start: InjuryState(i,cur_s);
      effects:
         @end: !OnVictim(m,v);
		 @end: !InjuryState(i,cur_s);
         @end: InjuryState(i,new_s);
   }
   
   action BlessureSaggrave(Injury i, State init_s, State final_s, BodyPart bp, Victim v){
   	  controlled;
      duration: constant 50;
      conditions:
         @start: InjuryState(i,init_s);
         @start: AVERAGE()=init_s;
         @start: BAD()=final_s;
		 @start: On(i,v);
		 @start: Loc(i,bp);
      effects:
		 @end: !InjuryState(i,init_s);
		 @end: InjuryState(i,final_s);
   }
   
  action VictimDie(Victim v, Injury i, State s){
   	  controlled;
      duration: constant 60;
      cost: constant 5;
      conditions:
		 @start: On(i,v);
		 @start: !Die(v);
         @start: BAD()=s;
         @overall: InjuryState(i,s);
      effects:
		 @end: Die(v);
   }
   
   action CommitStateInjury(Injury i, State init_s, State final_s, Victim v, BodyPart bp){
   	  controlled;
   	  duration: constant 10;
      cost: constant 1;
      conditions:
		 @start: On(i,v);
		 @start: Loc(i,bp);
      	 @start: InjuryState(i,init_s);
         @start: UNKNOWN() = init_s;
         @start: HEALED() != final_s;
         @start: init_s != final_s;
      effects:
		 @end: !InjuryState(i,init_s); // probability 1
		 @end: InjuryState(i,final_s); // probability 1
   }
   
   	/************************************
           		F C M s 
	*************************************/
   	// generate if victim die or not and in more or less time
	fcm ForgetInjury(Injury i, State s, Victim v){
		conditions:
       		@overall: InjuryState(i,s);
       		@overall: !Die(v);
       		@start: UNKNOWN() != s;
       		@start: HEALED() != s;
       inputs:
       		InjuryGravity = Value(s);
       		CoverInjury = Cover(i);
       outputs:
       		:Die(v) = VictDie;
       		:IsNotBreathing(v) = VictNotBreathing;
       		//:Test(v) = VictNotBreathing;
	}
	
}