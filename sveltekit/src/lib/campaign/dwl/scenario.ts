import type { Scenario } from '$lib/core/campaign'
import {
	agentsOfYogSothoth,
	ancientEvils,
	chillingCold,
	darkCult,
	lockedDoors,
	nightgaunts,
	rats,
	strikingFear,
} from '../core/encounter'
import {
	badLuck,
	beastThralls,
	bishopsThralls,
	bloodOnTheAltar,
	dunwich,
	extracurricularActivity,
	hideousAbominations,
	lostInTimeAndSpace,
	naomisCrew,
	sorcery,
	theBeyond,
	theEssexCountyExpress,
	theHouseAlwaysWins,
	theMiskatonicMuseum,
	undimensionedAndUnseen,
	whereDoomAwaits,
	whippoorwills,
} from './encounter'

export const extracurricularActivityScenario: Scenario = {
	name: 'Extracurricular Activity',
	encounterSets: [
		extracurricularActivity,
		agentsOfYogSothoth,
		ancientEvils,
		lockedDoors,
		bishopsThralls,
		sorcery,
		theBeyond,
		whippoorwills,
	],
}

export const theHouseAlwaysWinsScenario: Scenario = {
	name: 'The House Always Wins',
	encounterSets: [theHouseAlwaysWins, rats, badLuck, naomisCrew],
	encounterSetsSecondary: [strikingFear, hideousAbominations],
}

export const theMiskatonicMuseumScenario: Scenario = {
	name: 'The Miskatonic Museum',
	encounterSets: [theMiskatonicMuseum, chillingCold, lockedDoors, badLuck, sorcery, theBeyond],
}

export const theEssexCountyExpressScenario: Scenario = {
	name: 'The Essex County Express',
	encounterSets: [theEssexCountyExpress, ancientEvils, darkCult, strikingFear, theBeyond],
}

export const bloodOnTheAltarScenario: Scenario = {
	name: 'Blood on the Altar',
	encounterSets: [bloodOnTheAltar, ancientEvils, nightgaunts, dunwich, whippoorwills],
	encounterSetsSecondary: [naomisCrew],
}

export const undimensionedAndUnseenScenario: Scenario = {
	name: 'Undimensioned and Unseen',
	encounterSets: [undimensionedAndUnseen, strikingFear, beastThralls, dunwich, whippoorwills],
}

export const whereDoomAwaitsScenario: Scenario = {
	name: 'Where Doom Awaits',
	encounterSets: [
		whereDoomAwaits,
		ancientEvils,
		chillingCold,
		strikingFear,
		beastThralls,
		bishopsThralls,
		sorcery,
	],
	encounterSetsSecondary: [hideousAbominations],
}

export const lostInTimeAndSpaceScenario: Scenario = {
	name: 'Lost in Time and Space',
	encounterSets: [lostInTimeAndSpace, agentsOfYogSothoth, hideousAbominations, sorcery, theBeyond],
}