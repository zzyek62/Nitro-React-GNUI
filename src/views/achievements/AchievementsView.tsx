import { FC, useCallback, useEffect, useReducer, useState } from 'react';
import { AchievementsUIEvent } from '../../events/achievements';
import { useUiEvent } from '../../hooks/events';
import { NitroCardContentView, NitroCardHeaderView, NitroCardView } from '../../layout';
import { LocalizeText } from '../../utils/LocalizeText';
import { AchievementsMessageHandler } from './AchievementsMessageHandler';
import { AchievementsViewProps } from './AchievementsView.types';
import { AchievementsContextProvider } from './context/AchievementsContext';
import { AchievementsReducer, initialAchievements } from './reducers/AchievementsReducer';
import { AchievementCategoryView } from './views/category/AchievementCategoryView';
import { AchievementsListView } from './views/list/AchievementsListView';

export const AchievementsView: FC<AchievementsViewProps> = props =>
{
    const [ isVisible, setIsVisible ] = useState(false);
    const [ achievementsState, dispatchAchievementsState ] = useReducer(AchievementsReducer, initialAchievements);
    const { score = null } = achievementsState;

    const onAchievementsEvent = useCallback((event: AchievementsUIEvent) =>
    {
        switch(event.type)
        {
            case AchievementsUIEvent.SHOW_ACHIEVEMENTS:
                setIsVisible(true);
                return;
            case AchievementsUIEvent.HIDE_ACHIEVEMENTS:
                setIsVisible(false);
                return;   
            case AchievementsUIEvent.TOGGLE_ACHIEVEMENTS:
                setIsVisible(value => !value);
                return;
        }
    }, []);

    useUiEvent(AchievementsUIEvent.SHOW_ACHIEVEMENTS, onAchievementsEvent);
    useUiEvent(AchievementsUIEvent.HIDE_ACHIEVEMENTS, onAchievementsEvent);
    useUiEvent(AchievementsUIEvent.TOGGLE_ACHIEVEMENTS, onAchievementsEvent);
    
    useEffect(() =>
    {
        if(!isVisible) return;

    }, [ isVisible ]);

    return (
        <AchievementsContextProvider value={ { achievementsState, dispatchAchievementsState } }>
            <AchievementsMessageHandler />
            { isVisible &&
                <NitroCardView className="nitro-achievements">
                    <NitroCardHeaderView headerText={ LocalizeText('inventory.achievements') } onCloseClick={ event => setIsVisible(false) } />
                    <NitroCardContentView>
                        <div className="row">
                            <div className="col-6">
                                <AchievementsListView />
                                <div className="score border border-2 text-black text-center rounded">
                                    { LocalizeText('achievements.categories.score', ['score'], [score.toString()]) }
                                </div>
                            </div>
                            <div className="col-6">
                                <AchievementCategoryView />
                            </div>
                        </div>
                    </NitroCardContentView>
                </NitroCardView> }
        </AchievementsContextProvider>
    );
};