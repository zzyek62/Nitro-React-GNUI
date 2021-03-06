import { FC } from 'react';
import { UnseenItemCategory } from '../../../../api';
import { LayoutBadgeImageView, LayoutGridItem } from '../../../../common';
import { useInventoryBadges, useInventoryUnseenTracker } from '../../../../hooks';

export const InventoryBadgeItemView: FC<{ badgeCode: string }> = props =>
{
    const { badgeCode = null, children = null, ...rest } = props;
    const { selectedBadgeCode = null, setSelectedBadgeCode = null, getBadgeId = null } = useInventoryBadges();
    const { isUnseen = null } = useInventoryUnseenTracker();
    const unseen = isUnseen(UnseenItemCategory.BADGE, getBadgeId(badgeCode));

    return (
        <LayoutGridItem className="gnui-item-prev" itemActive={ (selectedBadgeCode === badgeCode) } itemUnseen={ unseen } onMouseDown={ event => setSelectedBadgeCode(badgeCode) } { ...rest }> 
            <LayoutBadgeImageView badgeCode={ badgeCode } />
            { children }
        </LayoutGridItem>
    );
}
