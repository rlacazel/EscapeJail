Problem {

 Objects{
    Nurse nurse1;
	Material tp1,tp2;
	Injury i1,i2;
	Victim patient1, patient2;
	State healed, good, average, bad, unknown;
	BodyPart rleg, lleg, rarm, larm, rchest, lchest;
 }

 WorldState{
        GOOD()=good;
        AVERAGE()=average;
        BAD()=bad;
        UNKNOWN()=unknown;
        HEALED()=healed;
        Value(good) = 0;
        Value(average) = 0.5;
        Value(bad) = 1;
 }

 InitialState{
	On(i1,patient1);
	Loc(i1,lleg);
	InBox(tp1);
	On(i2,patient2);
	Loc(i2,lleg);
	InBox(tp2);
	FreeHand(nurse1);
	InjuryState(i2,unknown);
	InjuryState(i1,unknown);
    Cover(i1);
    Test(patient1) = 10;
    Test(patient2) = 10;
 }

 Goal{
    InjuryState(i2,healed);
    Die(patient1);
    //IsNotBreathing(v2);
 }

}

