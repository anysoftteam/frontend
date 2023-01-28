import { Dispatch } from '@reduxjs/toolkit';
import { RegistryFilter } from 'src/interfaces/Filters';
import { HistoryRec } from 'src/interfaces/services/models/HistoryRec';
import { DocRecord } from 'src/interfaces/services/models/Record';
import { RegistryService } from 'src/services/registry/RegistryService';
import { uiActions } from 'src/store/ui/slice';
import { registryActions } from './slice';

export const fetchRegistryData =
  (filter: RegistryFilter) => (dispatch: Dispatch) =>
    RegistryService.getAllRegistry(filter)
      .then((data) =>
        dispatch(
          registryActions.setRegistries({
            records: data.entities,
            page: filter.page,
            count: filter.per_page,
            totalPages: Math.ceil(data.count / filter.per_page),
            totalCount: data.count,
          }),
        ),
      )
      .catch((error) => {
        dispatch(
          uiActions.showNotification({
            status: 'error',
            title: 'Error!',
            message: `Помилка! ${error.data.error}`,
          }),
        );
      });

export const createNewRegistry = (record: DocRecord) => (dispatch: Dispatch) =>
  RegistryService.createRegistry(record)
    .then((data) =>
      dispatch(
        uiActions.showNotification({
          status: 'success',
          title: 'Success!',
          message: 'Документ було додано!',
        }),
      ),
    )
    .catch((error) => {
      console.log(error);

      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error!',
          message: `Помилка! ${error.data.error}`,
        }),
      );
    });

export const updateRegistry = (record: DocRecord) => (dispatch: Dispatch) =>
  RegistryService.updateRegistry(record)
    .then((data) =>
      dispatch(
        uiActions.showNotification({
          status: 'success',
          title: 'Success!',
          message: 'Документ було змінено!',
        }),
      ),
    )
    .catch((error) => {
      console.log(error);

      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error!',
          message: `Помилка! ${error.data.error}`,
        }),
      );
    });

export const getRegistryById =
  (id: number) =>
  async (dispatch: Dispatch): Promise<DocRecord | undefined> => {
    try {
      const res = await RegistryService.getRegistryById(id);
      return res;
    } catch (error: any) {
      console.log(error);
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error!',
          message: `Помилка! ${error.data.error}`,
        }),
      );
    }
  };

export const getHistoryByRegistryId =
  (id: number) =>
  async (dispatch: Dispatch): Promise<HistoryRec[] | undefined> => {
    try {
      const res = await RegistryService.getRecordHistory({ doc_id: id });
      return res.entities;
    } catch (error: any) {
      console.log(error);
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error!',
          message: `Помилка! ${error.data.error}`,
        }),
      );
    }
  };
