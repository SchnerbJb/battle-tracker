
export interface Unit {
	Name: string;
	M: string;
	T: string;
	SV: string;
	W: string;
	LD: string;
	OC: string;
	RW?: Weapon[];
	MW: Weapon[];
	InvulnerableSave: string;
	Abilities: Abilities;
	WargearAbilities: Ability[];
	KeyWords: string[];
}

export interface Abilities {
	Core: string[];
	FactionAbilities: string[];
	DatasheetAbilities: Ability[];
}

export interface Ability {
	Name: string;
	Description: string;
}

export interface Weapon {
	Name: string;
	KeyWords: string[];
	A: string;
	BS: string;
	S: string;
	AP: string;
	D: string;
	Range?: string;
}


export interface Stratagems {
	Name: string,
	Turn: string,
	Origin: string,
	When: string,
	Target: string,
	Effect: string
}

