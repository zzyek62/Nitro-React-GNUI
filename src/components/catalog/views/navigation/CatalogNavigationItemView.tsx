import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FC } from 'react';
import { ICatalogNode } from '../../../../api';
import { LayoutGridItem, Text } from '../../../../common';
import { useCatalog } from '../../../../hooks';
import { CatalogIconView } from '../catalog-icon/CatalogIconView';
import { CatalogNavigationSetView } from './CatalogNavigationSetView';

export interface CatalogNavigationItemViewProps
{
    node: ICatalogNode;
}

export const CatalogNavigationItemView: FC<CatalogNavigationItemViewProps> = props =>
{
    const { node = null } = props;
    const { activateNode = null } = useCatalog();
    
    return (
        <>
            <LayoutGridItem gap={ 1 } column={ false } itemActive={ node.isActive } onClick={ event => activateNode(node) }>
                <CatalogIconView icon={ node.iconId } />
                <Text className="gnui-catalog-itm-bg" grow truncate>{ node.localization }</Text>
                { node.isBranch &&
                    <FontAwesomeIcon icon={ node.isOpen ? 'caret-up' : 'caret-down' } /> }
            </LayoutGridItem>
            { node.isOpen && node.isBranch &&
                <CatalogNavigationSetView node={ node } /> }
        </>
    );
}
