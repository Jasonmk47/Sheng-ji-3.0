import { GET_LOCAL_MODAL_STATE } from './localQueries';
import { ModalType } from 'constants/enums';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { ModalData } from '../../types/localQueryTypes';
import { assertNotNull } from '../Throw';

export default {
  toggleModal: (
    _root: any,
    variables: { type: ModalType },
    { cache }: { cache: InMemoryCache; getCacheKey: any },
  ) => {
    const modalState = assertNotNull(
      cache.readQuery<ModalData>({ query: GET_LOCAL_MODAL_STATE }),
      'Cannot read modal state',
    );

    const data = {
      modal: {
        ...modalState.modal,
        isOpen: !modalState.modal.isOpen,
        type: variables.type,
      },
    };

    cache.writeData({ data: data });
  },
};
