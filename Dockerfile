FROM  golang:1.21-rc-alpine as builder

WORKDIR /app

COPY ./app .

RUN CGO_ENABLED=0 GOOS=linux go build -ldflags="-w -s" -o hello main.go

# CMD ["./hello"]

FROM scratch

COPY --from=builder /app /

CMD ["./hello"]