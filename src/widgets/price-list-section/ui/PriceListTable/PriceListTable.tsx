import { useTranslation } from "react-i18next";
import clsx from "clsx";
import { type PriceListTableData, type Material } from "@/entities/material";
import {
  COLUMN_GROUPS_END_INDEXES,
  COLUMN_GROUPS_START_INDEXES,
  TABLE_HEADERS,
} from "../../model";

import s from "./PriceListTable.module.scss";

interface PriceListTableProps {
  data: PriceListTableData;
  isLoading: boolean;
  error: string | null;
}

function PriceListTable({ data, isLoading, error }: PriceListTableProps) {
  const { t } = useTranslation();

  if (error) {
    return (
      <p className={s["price-list-table__error"]} role="alert">
        {error}
      </p>
    );
  }

  function renderHeaders() {
    return (
      <tr>
        {TABLE_HEADERS.map((header, headerIndex) => {
          const isFirstColumn = headerIndex === 0;
          const isLastColumn = headerIndex === TABLE_HEADERS.length - 1;
          const isFirstColumnInGroup =
            COLUMN_GROUPS_START_INDEXES.includes(headerIndex);
          const isLastColumnInGroup =
            COLUMN_GROUPS_END_INDEXES.includes(headerIndex);

          return (
            <th
              key={header.visible}
              aria-label={t(header.readable)}
              className={clsx({
                [s["cell_last-col-in-group"]]: isLastColumnInGroup,
              })}
            >
              <div
                className={clsx(s["cell-content-wrapper"], {
                  [s["cell-content-wrapper_first-in-group"]]:
                    isFirstColumn || isFirstColumnInGroup,
                  [s["cell-content-wrapper_top-left"]]:
                    isFirstColumn || isFirstColumnInGroup,
                  [s["cell-content-wrapper_last-in-group"]]:
                    isLastColumn || isLastColumnInGroup,
                  [s["cell-content-wrapper_top-right"]]:
                    isLastColumn || isLastColumnInGroup,
                  [s["cell-content-wrapper_last-col"]]: isLastColumn,
                })}
              >
                <div className={s["cell-content"]}>{t(header.visible)}</div>
              </div>
            </th>
          );
        })}
      </tr>
    );
  }

  function renderGroupName(
    groupName: Material["wood"],
    groupIndex: number,
    materialsCount: number,
  ) {
    const isFirstGroup = groupIndex === 0;

    return (
      <th
        rowSpan={materialsCount}
        className={clsx(
          s["cell_group-name"],
          s["cell_group-name_bottom-left"],
          s["cell_last-row-in-group"],
          {
            [s["cell_group-name_top-left"]]: !isFirstGroup,
          },
        )}
      >
        <div
          className={clsx(
            s["cell-content-wrapper"],
            s["cell-content-wrapper_first-in-group"],
            s["cell-content-wrapper_bottom-left"],
            {
              [s["cell-content-wrapper_top-left"]]: !isFirstGroup,
            },
          )}
        >
          <div className={s["cell-content"]}>{groupName}</div>
        </div>
      </th>
    );
  }

  function renderColumns(
    groupIndex: number,
    materialId: string,
    materialsCount: number,
    materialIndex: number,
    columns: number[],
  ) {
    return columns.map((property, propertyIndex) => {
      const columnIndex = propertyIndex + 1;

      const isFirstGroup = groupIndex === 0;
      const isLastColumn = propertyIndex === columns.length - 1;

      const isFirstColumnInGroup =
        COLUMN_GROUPS_START_INDEXES.includes(columnIndex);
      const isLastColumnInGroup =
        COLUMN_GROUPS_END_INDEXES.includes(columnIndex);
      const isFirstRowInGroup = materialIndex === 0;
      const isLastRowInGroup = materialIndex === materialsCount - 1;

      return (
        <td
          key={`${materialId}-${propertyIndex}`}
          className={clsx({
            [s["cell_last-col-in-group"]]: isLastColumnInGroup,
            [s["cell_last-row-in-group"]]: isLastRowInGroup,
          })}
        >
          <div
            className={clsx(s["cell-content-wrapper"], {
              [s["cell-content-wrapper_first-in-group"]]: isFirstColumnInGroup,
              [s["cell-content-wrapper_last-in-group"]]:
                isLastColumnInGroup || isLastColumn,
              [s["cell-content-wrapper_top-left"]]:
                !isFirstGroup && isFirstRowInGroup && isFirstColumnInGroup,
              [s["cell-content-wrapper_top-right"]]:
                !isFirstGroup &&
                isFirstRowInGroup &&
                (isLastColumnInGroup || isLastColumn),
              [s["cell-content-wrapper_bottom-right"]]:
                isLastRowInGroup && (isLastColumnInGroup || isLastColumn),
              [s["cell-content-wrapper_bottom-left"]]:
                isLastRowInGroup && isFirstColumnInGroup,
              [s["cell-content-wrapper_last-col"]]: isLastColumn,
              [s["cell-content-wrapper_last-row"]]: isLastRowInGroup,
            })}
          >
            <div className={s["cell-content"]}>{property}</div>
          </div>
        </td>
      );
    });
  }

  function renderGroup(groupIndex: number, groupData: Material[]) {
    return groupData.map((material, materialIndex) => {
      const materialsCount = groupData.length;
      const { id, wood, length, width, height, volume, price, priceM3 } =
        material;
      const columns = [length, width, height, volume, price, priceM3];

      return (
        <tr key={id}>
          {materialIndex === 0 &&
            renderGroupName(wood, groupIndex, materialsCount)}

          {renderColumns(
            groupIndex,
            id,
            materialsCount,
            materialIndex,
            columns,
          )}
        </tr>
      );
    });
  }

  function renderGroups(tableData: PriceListTableData) {
    return Object.values(tableData).map((groupData, groupIndex) =>
      renderGroup(groupIndex, groupData),
    );
  }

  return (
    <div className={s["price-table-container"]}>
      <div className={s["price-table-wrapper"]}>
        <table
          className={clsx(s["price-table"], {
            [s["price-table_stale"]]: isLoading,
          })}
        >
          <thead>{renderHeaders()}</thead>

          <tbody>{renderGroups(data)}</tbody>
        </table>
      </div>
    </div>
  );
}

export default PriceListTable;
