import { FC, useEffect } from 'react';
import { LocalizeText } from '../../../api';
import { Column, Text } from '../../../common';
import { useWired } from '../../../hooks';

export const WiredFurniSelectorView: FC<{}> = props =>
{
    const { trigger = null, furniIds = [], setAllowsFurni = null } = useWired();

    useEffect(() =>
    {
        setAllowsFurni(true);

        return () =>
        {
            setAllowsFurni(false);
        }
    }, [ setAllowsFurni ]);
    
    return (
        <Column gap={ 1 }>
            <Text className="gnui-txt-white" bold>{ LocalizeText('wiredfurni.pickfurnis.caption', [ 'count', 'limit' ], [ furniIds.length.toString(), trigger.maximumItemSelectionCount.toString() ]) }</Text>
            <Text className="gnui-txt-swhite" small>{ LocalizeText('wiredfurni.pickfurnis.desc') }</Text>
        </Column>
    );
}
