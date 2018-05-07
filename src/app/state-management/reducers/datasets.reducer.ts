import { Action } from '@ngrx/store';
import { Dataset } from 'shared/sdk/models';

import {
    FILTER_UPDATE,
    FILTER_UPDATE_COMPLETE,

    SELECT_CURRENT,
    SELECTED_UPDATE,
    TOTAL_UPDATE,
    FILTER_VALUE_UPDATE,

    CURRENT_BLOCKS_COMPLETE,
    SEARCH_ID_COMPLETE,
    SELECTED_DATABLOCKS_COMPLETE,
    SEARCH_COMPLETE,
    ADD_GROUPS_COMPLETE,
} from 'state-management/actions/datasets.actions';

import { DatasetState, initialDatasetState } from 'state-management/state/datasets.store';

export function datasetsReducer(state = initialDatasetState, action: Action) {
    if (action.type.indexOf('[Dataset]') !== -1) {
        console.log('Action came in! ' + action.type);
    }

    switch (action.type) {
        case FILTER_UPDATE: {
            const f = action['payload'];
            const group = f['ownerGroup'];

            if (group && !Array.isArray(group) && group.length > 0) {
                f['ownerGroup'] = [group];
            }

            return {...state, activeFilters: f, loading: true, selectedSets: []};
        }

        case SEARCH_COMPLETE: {
            const datasets = <Dataset[]>action['payload'];
            return {...state, datasets, loading: false};
        }

        case ADD_GROUPS_COMPLETE: {
            const ownerGroup = action['payload'];
            const activeFilters = {...state.activeFilters, ownerGroup};
            return {...state, activeFilters, foo: 10};
        }

        case FILTER_VALUE_UPDATE:
        case FILTER_UPDATE_COMPLETE: {
            const filterValues = action['payload'];
            return {...state, filterValues, loading: false};
        }

        case SELECT_CURRENT:
        case CURRENT_BLOCKS_COMPLETE:
        case SEARCH_ID_COMPLETE: {
            const currentSet = <Dataset>action['payload'];
            return {...state, currentSet};
        }

        case SELECTED_DATABLOCKS_COMPLETE:
        case SELECTED_UPDATE: {
            const selectedSets = <Dataset[]>action['payload'];
            return {...state, selectedSets};
        }

        case TOTAL_UPDATE: {
            const totalSets = <number>action['payload'];
            return {...state, totalSets};
        }

        // TODO handle failed actions
        default: {
            return state;
        }
    }
}

export const getDatasets = (state: DatasetState) => state.datasets;
export const getActiveFilters = (state: DatasetState) => state.activeFilters;
export const getFilterValues = (state: DatasetState) => state.filterValues;
export const getCurrentSet = (state: DatasetState) => state.currentSet;
