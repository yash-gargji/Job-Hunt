import React from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { useSelector } from 'react-redux';
import { CheckCircle, Clock, XCircle } from 'lucide-react';

const statusMap = {
  accepted: {
    color: 'bg-green-100 text-green-700 border border-green-200',
    icon: <CheckCircle className="w-4 h-4 mr-1 text-green-500" />
  },
  pending: {
    color: 'bg-yellow-100 text-yellow-700 border border-yellow-200',
    icon: <Clock className="w-4 h-4 mr-1 text-yellow-500" />
  },
  rejected: {
    color: 'bg-red-100 text-red-700 border border-red-200',
    icon: <XCircle className="w-4 h-4 mr-1 text-red-500" />
  }
};

const AppliedJobTable = () => {
  const { allAppliedJobs } = useSelector(store => store.job);

  return (
    <div className="bg-gradient-to-br from-sky-50 to-blue-100 rounded-3xl shadow-2xl p-8 overflow-x-auto scrollbar-hide">
      <Table className="min-w-[700px]">
        <TableHeader>
          <TableRow className="bg-white/80">
            <TableHead className="py-3 px-6 text-sky-900 font-bold text-base">Date</TableHead>
            <TableHead className="py-3 px-6 text-sky-900 font-bold text-base">Job Role</TableHead>
            <TableHead className="py-3 px-6 text-sky-900 font-bold text-base">Company</TableHead>
            <TableHead className="py-3 px-6 text-right text-sky-900 font-bold text-base">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allAppliedJobs.length <= 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-12">
                <div className="flex flex-col items-center">
                  <span className="text-xl text-gray-400 font-semibold mb-2">
                    You haven&apos;t applied to any jobs yet.
                  </span>
                  <span className="text-sky-600 font-medium">
                    Start exploring and apply to your dream job!
                  </span>
                </div>
              </TableCell>
            </TableRow>
          ) : (
            allAppliedJobs.map((appliedJob) => {
              const status = statusMap[appliedJob?.status] || statusMap['pending'];
              return (
                <TableRow
                  key={appliedJob._id}
                  className="bg-white/90 hover:bg-blue-50 transition-all duration-200"
                >
                  <TableCell className="text-gray-500 font-medium px-6">
                    {appliedJob?.createdAt?.split("T")[0]}
                  </TableCell>
                  <TableCell className="px-6">
                    <span className="font-bold text-sky-900 text-base">
                      {appliedJob.job?.title}
                    </span>
                  </TableCell>
                  <TableCell className="px-6">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full shadow bg-white flex items-center justify-center border">
                        <img
                          src={appliedJob.job?.company?.logo || "/altCompany.avif"}
                          alt={appliedJob.job?.company?.name || "Company"}
                          className="h-8 w-8 rounded-full object-contain"
                        />
                      </div>
                      <span className="text-gray-700 font-semibold">{appliedJob.job?.company?.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right px-6 align-middle">
                    <span className="inline-flex items-center justify-end">
                      <Badge className={`rounded-full px-4 py-1 font-semibold text-sm flex items-center ${status.color}`}>
                        {status.icon}
                        {appliedJob.status.charAt(0).toUpperCase() + appliedJob.status.slice(1)}
                      </Badge>
                    </span>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
        <caption className="caption-bottom py-6 text-center text-lg font-semibold text-sky-900">
          Your Recent Applications
        </caption>
      </Table>
    </div>
  );
};

export default AppliedJobTable;
