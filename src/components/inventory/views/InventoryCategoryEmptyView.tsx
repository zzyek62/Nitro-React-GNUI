import { FC } from 'react';
import { Column, Grid, GridProps, Text } from '../../../common';

export interface InventoryCategoryEmptyViewProps extends GridProps
{
    title: string;
    desc: string;
}

export const InventoryCategoryEmptyView: FC<InventoryCategoryEmptyViewProps> = props =>
{
    const { title = '', desc = '', children = null, ...rest } = props;
    
    return (
        <Grid { ...rest }>
            <Column center size={ 5 } overflow="hidden">
                <div className="empty-image" />
            </Column>
            <Column justifyContent="center" size={ 7 } overflow="hidden">
                <Text className="gnui-inv-empt-title" fontWeight="bold" fontSize={ 5 } overflow="unset" truncate>{ title }</Text>
                <Text className="gnui-inv-empt-desc" overflow="auto">{ desc }</Text>
            </Column>
            { children }
        </Grid>
    );
}
