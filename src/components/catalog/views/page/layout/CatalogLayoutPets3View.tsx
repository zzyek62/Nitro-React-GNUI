import { FC } from 'react';
import { Base } from '../../../../../common/Base';
import { Column } from '../../../../../common/Column';
import { Flex } from '../../../../../common/Flex';
import { CatalogLayoutProps } from './CatalogLayout.types';

export const CatalogLayoutPets3View: FC<CatalogLayoutProps> = props =>
{
    const { page = null } = props;

    const imageUrl = page.localization.getImage(1);
    
    return (
        <Column grow className="gnui-cat-bg-default rounded p-2" overflow="hidden">
            <Flex alignItems="center" gap={ 2 }>
                { imageUrl && <img alt="" src={ imageUrl } /> }
                <Base className="fs-5 gnui-txt-white" dangerouslySetInnerHTML={ { __html: page.localization.getText(1) } } />
            </Flex>
            <Column grow alignItems="center" overflow="auto">
                <Base className="gnui-txt-swhite" dangerouslySetInnerHTML={ { __html: page.localization.getText(2) } } />
            </Column>
            <Flex alignItems="center">
                <Base className=" gnui-txt-white" dangerouslySetInnerHTML={ { __html: page.localization.getText(3) } } />
            </Flex>
        </Column>
    );
}
