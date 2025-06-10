import { useState, useMemo } from 'react';
import style from './style.module.scss';

interface Route {
  uuid: string;
  address: string;
  mask: string;
  gateway: string;
  interface: string;
}

type SortFieldType = 'address' | 'gateway' | 'interface';
type SortDirectionType = 'asc' | 'desc';

const routes: Route[] = [
  {
    uuid: '1',
    address: '0.0.0.0',
    mask: '/0',
    gateway: '193.0.174.1',
    interface: 'Подключение Ethernet',
  },
  {
    uuid: '2',
    address: '10.1.30.0',
    mask: '/24',
    gateway: '0.0.0.0',
    interface: 'Гостевая сеть',
  },
  {
    uuid: '3',
    address: '192.168.1.0',
    mask: '/24',
    gateway: '0.0.0.0',
    interface: 'Домашняя сеть',
  },
  {
    uuid: '4',
    address: '193.0.174.0',
    mask: '/24',
    gateway: '0.0.0.0',
    interface: 'Подключение Ethernet',
  },
  {
    uuid: '5',
    address: '193.0.175.0',
    mask: '/25',
    gateway: '193.0.174.10',
    interface: 'Подключение Ethernet',
  },
  {
    uuid: '6',
    address: '193.0.175.22',
    mask: '/32',
    gateway: '193.0.174.1',
    interface: 'Подключение Ethernet',
  },
  {
    uuid: '7',
    address: '172.16.0.0',
    mask: '/12',
    gateway: '10.1.30.1',
    interface: 'VPN соединение',
  },
  {
    uuid: '8',
    address: '224.0.0.0',
    mask: '/4',
    gateway: '0.0.0.0',
    interface: 'Multicast',
  },
];

const compareIpAddresses = (a: string, b: string): number => {
  const parseIp = (ip: string): number[] => {
    return ip.split('.').map(part => parseInt(part));
  };

  const ipA = parseIp(a);
  const ipB = parseIp(b);

  for (let i = 0; i < 4; i++) {
    if (ipA[i] !== ipB[i]) {
      return ipA[i] - ipB[i];
    }
  }
  return 0;
};

const RouteTable = () => {
  const [sortField, setSortField] = useState<SortFieldType>('address');
  const [sortDirection, setSortDirection] = useState<SortDirectionType>('asc');

  const sortedRoutes = useMemo(() => {
    return [...routes].sort((a, b) => {
      let comparison = 0;

      switch (sortField) {
        case 'address':
        case 'gateway':
          comparison = compareIpAddresses(a[sortField], b[sortField]);
          break;
        case 'interface':
          comparison = a[sortField].localeCompare(b[sortField], 'ru');
          break;
      }

      return sortDirection === 'asc' ? comparison : -comparison;
    });
  }, [routes, sortField, sortDirection]);

  const handleSort = (field: SortFieldType) => {
    if (sortField === field) {
      setSortDirection(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getSortArrow = (field: SortFieldType): string => {
    if (sortField !== field) return '';
    return sortDirection === 'asc' ? ' ↑' : ' ↓';
  };

  return (
    <div className={style.routeTableContainer}>
      <h2>Действующие маршруты IPv4</h2>

      <table className={style.routesTable}>
        <thead>
          <tr>
            <th
              onClick={() => handleSort('address')}
              className={style.sortable}
            >
              Адрес назначения{getSortArrow('address')}
            </th>
            <th
              onClick={() => handleSort('gateway')}
              className={style.sortable}
            >
              Шлюз{getSortArrow('gateway')}
            </th>
            <th
              onClick={() => handleSort('interface')}
              className={style.sortable}
            >
              Интерфейс{getSortArrow('interface')}
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedRoutes.map(route => (
            <tr key={route.uuid}>
              <td>
                {route.address}
                {route.mask}
              </td>
              <td>{route.gateway}</td>
              <td>{route.interface}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RouteTable;
