import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "./ui/pagination";

interface PagerProps {
    pageCount: number;
    currentPage: number;
    resultCount: number;
    handlePageClick: (page: number) => void;
}

const Pager = ({ pageCount, currentPage, resultCount, handlePageClick }: PagerProps) => {
    const ELLIPSIS = -10;
    if (resultCount <= 10) {
        return null;
    }

    let pages: number[] = [];
    if (pageCount <= 5) {
        // ページ数が少なければすべて表示
        for (let i = 1; i <= pageCount; i++) {
            pages.push(i);
        }
    } else {
        // 現在ページが3以下の場合
        if (currentPage <= 3) {
            pages = [1, 2, 3, ELLIPSIS, pageCount];
        } else if (currentPage >= pageCount - 2) {
            // 現在ページが最終ページ付近の場合
            pages = [1, ELLIPSIS, pageCount - 2, pageCount - 1, pageCount];
        } else {
            // 現在ページが中央の場合
            pages = [1, ELLIPSIS, currentPage, ELLIPSIS, pageCount];
        }
    }

    return (
        <Pagination>
            <PaginationContent>
                <div className="flex justify-between w-full gap-1">
                    <PaginationItem>
                        <PaginationPrevious
                            onClick={() => handlePageClick(currentPage - 1)}
                            className={
                                currentPage <= 1
                                    ? "text-neutral-600 hover:text-neutral-600 bg-neutral-300 hover:bg-neutral-300"
                                    : ""
                            }
                        />
                    </PaginationItem>
                    <div className="flex items-center gap-2">
                        {pages.map((p, i) => {
                            if (p == ELLIPSIS) {
                                return (
                                    <PaginationItem key={`ellipsis-${i}`}>
                                        <PaginationEllipsis />
                                    </PaginationItem>
                                );
                            }
                            return (
                                <PaginationItem key={p}>
                                    <PaginationLink
                                        onClick={() => handlePageClick(p)}
                                        isActive={p === currentPage}
                                    >
                                        {p}
                                    </PaginationLink>
                                </PaginationItem>
                            );
                        })}
                    </div>
                    <PaginationItem>
                        <PaginationNext
                            onClick={() => handlePageClick(currentPage + 1)}
                            className={
                                pageCount <= currentPage
                                    ? "text-neutral-600 hover:text-neutral-600 bg-neutral-300 hover:bg-neutral-300"
                                    : ""
                            }
                        />
                    </PaginationItem>
                </div>
            </PaginationContent>
        </Pagination>
    );
};

export default Pager;
