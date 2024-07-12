import React, { useState } from 'react';
import clsx from 'clsx';
const HeadingTab = ({
  heading,
  setActive,
  isTabActive,
}: {
  heading: string;
  setActive: React.Dispatch<React.SetStateAction<string>>;
  isTabActive: boolean;
}) => {
  const outerDivClass = clsx(
    'bg-white',
    'flex',
    'flex-row',
    'justify-center',
    'items-center',
    'rounded-md',
    'px-2',
    'py-1',
    'gap-3',
    'w-24',
    {
      'text-gray-400': !isTabActive,
      'text-black': isTabActive,
    },
  );

  return (
    <>
      <div
        onClick={() => {
          setActive(heading.toLowerCase());
        }}
        className="flex flex-col gap-y-3 max-w-56 cursor-pointer"
      >
        <div className={outerDivClass}>
          <p className="text-[13px] font-semibold">{heading}</p>
        </div>
        {isTabActive && (
          <hr className={`rounded-md border-none h-[4px] bg-black`} />
        )}
      </div>
    </>
  );
};

const App = () => {
  const [entries, setEntries] = useState([
    {
      id: 1,
      title: 'Package 1',
      rate: 100,
      total: 100,
      ticked: false,
      children: [
        {
          id: 11,
          title: 'Sub 1',
          rate: 100,
          total: 100,
          ticked: false,
          children: [
            { id: 111, title: 'Sub 11', children: [] },
            { id: 112, title: 'Sub 12', children: [] },
          ],
        },
        {
          id: 12,
          title: 'Sub 2',
          rate: 100,
          total: 100,
          ticked: false,
          children: [
            { id: 121, title: 'Sub 21', children: [] },
            { id: 122, title: 'Sub 22', children: [] },
          ],
        },
      ],
    },
    {
      id: 2,
      title: 'Package 2',
      rate: 200,
      total: 200,
      ticked: false,
      children: [
        {
          id: 21,
          title: 'Sub 1',
          rate: 100,
          total: 100,
          ticked: false,
          children: [
            { id: 211, title: 'Sub 11', children: [] },
            { id: 212, title: 'sub 12', children: [] },
          ],
        },
        {
          id: 22,
          title: 'Sub 2',
          rate: 100,
          total: 100,
          ticked: false,
          children: [
            { id: 221, title: 'Sub 21', children: [] },
            { id: 222, title: 'Sub 22', children: [] },
          ],
        },
      ],
    },
  ]);

  const [expanded, setExpanded] = useState({});
  const [activeTab, setActiveTab] = useState<string>('overview');

  const toggleExpand = id => {
    setExpanded({
      ...expanded,
      [id]: !expanded[id],
    });
  };

  const renderChildrenData = (ticked, subData) => {
    console.log(ticked);
    return subData.map(val => (
      <React.Fragment key={val.id}>
        <tr
          className="cursor-pointer ml-32"
          onClick={() => toggleExpand(val.id)}
        >
          <td className="border px-32 py-2">
            <input
              type="checkbox"
              checked={ticked || val.ticked}
              value={ticked || val.ticked}
              onClick={e => {
                e.stopPropagation();
                // if parent is ticked, then all children should be ticked
                setEntries([...entries], (val.ticked = !val.ticked));
              }}
              className="mr-2"
            />
            {val.title}
          </td>
          <td className="border px-4 py-2">{val.rate}</td>
          <td className="border px-4 py-2">{val.total}</td>
        </tr>
        {expanded[val.id] &&
          val.children.map(val2 => (
            <tr className="" key={val2.id}>
              <td className="border px-64 py-2">
                <input
                  onClick={e => {
                    setEntries([...entries], (val2.ticked = !val2.ticked));
                  }}
                  checked={ticked || val.ticked || val2.ticked}
                  type="checkbox"
                  className="mr-2"
                />
                {val2.title}
              </td>
              <td className="border px-4 py-2">{val2?.rate}</td>
              <td className="border px-4 py-2">{val2?.total}</td>
            </tr>
          ))}
      </React.Fragment>
    ));
  };

  const otherActive = activeTab === 'other';
  const overviewActive = activeTab === 'overview';

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex justify-center w-[600px] py-6">
        <div className="flex gap-x-2">
          <HeadingTab
            heading="Overview"
            setActive={setActiveTab}
            isTabActive={overviewActive}
          />
          <HeadingTab
            heading="Other"
            setActive={setActiveTab}
            isTabActive={otherActive}
          />
        </div>
      </div>
      <div className="flex flex-wrap justify-center">
        {overviewActive && (
          <table className="table-auto">
            <thead>
              <tr>
                <th className="border px-4 py-2 flex justify-start">
                  <input
                    type="checkbox"
                    onClick={e => {
                      e.stopPropagation();
                    }}
                    className="mr-2"
                  />
                  Packages
                </th>
                <th className="border px-4 py-2">Rate</th>
                <th className="border px-4 py-2">Total</th>
              </tr>
            </thead>
            <tbody>
              {entries &&
                entries?.map(entry => (
                  <React.Fragment key={entry.id}>
                    <tr
                      className="cursor-pointer"
                      onClick={() => toggleExpand(entry.id)}
                    >
                      <td className="border px-4 py-2 w-[600px]">
                        <input
                          type="checkbox"
                          onClick={e => {
                            e.stopPropagation();
                            // if parent is ticked, then all children should be ticked
                            // entries is an array, so we need to spread it to make it a new array
                            setEntries(
                              [...entries],
                              (entry.ticked = !entry.ticked),
                            );
                          }}
                          className="mr-2"
                        />
                        {entry.title}
                      </td>
                      <td className="border px-4 py-2">{entry.rate}</td>
                      <td className="border px-4 py-2">{entry.total}</td>
                    </tr>
                    {expanded[entry.id] &&
                      renderChildrenData(entry.ticked, entry.children)}
                  </React.Fragment>
                ))}
            </tbody>
          </table>
        )}
        {otherActive && <div>Hello World</div>}
      </div>
    </div>
  );
};

export default App;
