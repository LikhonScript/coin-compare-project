import { formatNum } from "./section-components/CoinTable";
import { DataCell, HeaderCellLeading, Table, TableBody, TableHead, TableRow } from "./Table";

export default function CoinDetails({ data }) {
  return (
    <Table>
      <TableHead>
        <HeaderCellLeading>
          <b className="font-normal">{data?.name}</b>
          <b className="mx-2">({data?.symbol})</b>
        </HeaderCellLeading>
      </TableHead>
      <TableBody>
        <TableRow>
          <DataCell>${formatNum(data?.quote?.USD?.price)}</DataCell>
        </TableRow>
        <TableRow>
          <DataCell>#{formatNum(data?.cmc_rank)}</DataCell>
        </TableRow>
        <TableRow>
          <DataCell>${formatNum(data?.quote?.USD?.market_cap)}</DataCell>
        </TableRow>
        <TableRow>
          <DataCell>${formatNum(data?.quote?.USD?.fully_diluted_market_cap)}</DataCell>
        </TableRow>
        <TableRow>
          <DataCell>${formatNum(data?.quote?.USD?.market_cap_dominance)}</DataCell>
        </TableRow>
        <TableRow>
          <DataCell>{formatNum(data?.quote?.USD?.volume_change_24h)}%</DataCell>
        </TableRow>
        <TableRow>
          <DataCell>{formatNum(data?.quote?.USD?.percent_change_24h)}</DataCell>
        </TableRow>
        <TableRow>
          <DataCell>{formatNum(data?.quote?.USD?.percent_change_7d)}</DataCell>
        </TableRow>
        <TableRow>
          <DataCell>{formatNum(data?.quote?.USD?.percent_change_30d)}</DataCell>
        </TableRow>
        <TableRow>
          <DataCell>{formatNum(data?.quote?.USD?.percent_change_60d)}</DataCell>
        </TableRow>
        <TableRow>
          <DataCell>{formatNum(data?.quote?.USD?.percent_change_90d)}</DataCell>
        </TableRow>
        <TableRow>
          <DataCell>{data?.quote?.max_supply ? formatNum(data?.quote?.max_supply) : "N/A"}</DataCell>
        </TableRow>
        <TableRow>
          <DataCell>{formatNum(data?.circulating_supply)}</DataCell>
        </TableRow>
        <TableRow>
          <DataCell>{formatNum(data?.total_supply)}</DataCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
