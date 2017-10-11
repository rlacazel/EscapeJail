Problem {

 Objects{
    Guard g1, g2;
	Prisoner p1, p2;
	Door d1, d2;
 }

 WorldState{
 }

 InitialState{
    HasKeyG(g1);
    //HasKeyG(g2);
    Dazed(g1) = 60;
    Dazed(g2) = 60;
    CanReachG(p1,g1);
    CanReachG(p2,g2);
    CanReachP(p2,p1);
    CanReachP(p1,p2);
    CanReachD(p1,d1);
    CanReachD(p2,d2);
 }

 Goal{
   Open(d1);
   Open(d2);
 }

}

